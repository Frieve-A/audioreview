#!/usr/bin/env python3
"""
Missing Price Metadata Checker

This script detects product review files that are missing the required 'price' metadata field.
The price field is required for product reviews and should match the denominator used in cost-performance calculations.

Usage:
    python check_missing_price.py                    # Check all product review files
    python check_missing_price.py -v                 # Verbose output with file details
    python check_missing_price.py --fix              # Create a report with suggested fixes
    python check_missing_price.py --before 2025-08-14  # Check files dated on/before 2025-08-14
    python check_missing_price.py --stats            # Show detailed statistics
"""

import os
import sys
import re
import yaml
import glob
import argparse
from pathlib import Path
from typing import List, Dict, Optional
from dataclasses import dataclass, field
from datetime import datetime, time
from collections import defaultdict

# Handle Windows console encoding issues
if sys.platform.startswith('win'):
    # Set console to UTF-8 mode if possible
    try:
        os.system('chcp 65001 > nul 2>&1')
    except:
        pass

@dataclass
class ProductReview:
    """Class to store product review data"""
    file_path: str
    layout: str
    title: str
    target_name: str
    company_id: str
    lang: str
    ref: str
    date: str
    rating: List[float]
    summary: str
    tags: List[str]
    permalink: str
    price: Optional[float] = None
    
    # Validation results
    issues: List[str] = field(default_factory=list)

class MissingPriceChecker:
    """Missing price metadata checker class"""
    
    def __init__(self, base_path: str = ".", before: Optional[str] = None):
        self.base_path = Path(base_path).resolve()
        # If running from tools directory, adjust the path
        if self.base_path.name == "tools":
            self.base_path = self.base_path.parent
        self.product_reviews: List[ProductReview] = []
        self.missing_price_files: List[ProductReview] = []
        # Optional upper bound datetime for validation target
        self.before_datetime: Optional[datetime] = self._parse_before_datetime(before) if before else None

    def _parse_before_datetime(self, before: str) -> Optional[datetime]:
        """Parse the --before argument into a datetime.

        Accepts common formats such as YYYY-MM-DD, YYYY-MM-DDTHH:MM, YYYY-MM-DD HH:MM, and with seconds.
        If only a date is provided, treat it as 00:00:00 of that date.
        """
        candidates = [
            "%Y-%m-%d",
            "%Y-%m-%dT%H:%M",
            "%Y-%m-%d %H:%M",
            "%Y-%m-%dT%H:%M:%S",
            "%Y-%m-%d %H:%M:%S",
        ]
        for fmt in candidates:
            try:
                parsed = datetime.strptime(before, fmt)
                # If format included only date, normalize to start of day
                if fmt == "%Y-%m-%d":
                    return datetime.combine(parsed.date(), time.min)
                return parsed
            except ValueError:
                continue
        print(f"[WARNING] '--before' has an unrecognized format: {before}. Expected YYYY-MM-DD[THH:MM[:SS]]")
        return None

    def find_product_review_files(self) -> List[str]:
        """Find all product review files"""
        product_files = []
        
        # Search in both _products/en and _products/ja directories
        for lang in ['en', 'ja']:
            products_dir = self.base_path / '_products' / lang
            print(f"Checking directory: {products_dir}")
            if products_dir.exists():
                print(f"Directory exists: {products_dir}")
                # Find all .md files recursively
                for md_file in products_dir.rglob('*.md'):
                    product_files.append(str(md_file))
            else:
                print(f"Directory does not exist: {products_dir}")
        
        return product_files

    def parse_front_matter(self, file_path: str) -> Optional[Dict]:
        """Parse YAML front matter from markdown file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Extract front matter between --- markers
            front_matter_match = re.match(r'^---\s*\n(.*?)\n---\s*\n', content, re.DOTALL)
            if not front_matter_match:
                return None
            
            front_matter_text = front_matter_match.group(1)
            return yaml.safe_load(front_matter_text)
            
        except Exception as e:
            print(f"[ERROR] Failed to parse {file_path}: {e}")
            return None

    def validate_product_review(self, file_path: str, front_matter: Dict) -> Optional[ProductReview]:
        """Validate a product review file and extract data"""
        try:
            # Check if this is a product review
            layout = front_matter.get('layout', '')
            if layout != 'product':
                return None
            
            # Extract required fields
            review = ProductReview(
                file_path=file_path,
                layout=layout,
                title=front_matter.get('title', ''),
                target_name=front_matter.get('target_name', ''),
                company_id=front_matter.get('company_id', ''),
                lang=front_matter.get('lang', ''),
                ref=front_matter.get('ref', ''),
                date=front_matter.get('date', ''),
                rating=front_matter.get('rating', []),
                summary=front_matter.get('summary', ''),
                tags=front_matter.get('tags', []),
                permalink=front_matter.get('permalink', ''),
                price=front_matter.get('price')
            )
            
            # Check for missing or invalid price
            price_value = front_matter.get('price')
            is_price_valid = False
            price_issues = []
            
            # Check if price exists and is a valid number
            if price_value is not None:
                try:
                    # Convert to float to validate it's a number
                    price_float = float(price_value)
                    if price_float >= 0:  # Allow 0 for free products or undetermined prices
                        is_price_valid = True
                    else:
                        price_issues.append(f"Price must be greater than or equal to 0: {price_value}")
                except (ValueError, TypeError):
                    price_issues.append(f"Invalid price value: {price_value}")
            else:
                price_issues.append("Missing 'price' metadata field")
            
            # Check price format based on language
            if is_price_valid and price_value is not None:
                lang = front_matter.get('lang', '')
                if lang == 'ja':
                    # Japanese articles should use JPY (integer values common)
                    if not isinstance(price_value, (int, float)) or price_value < 0:
                        price_issues.append("Japanese articles should use non-negative JPY values")
                elif lang == 'en':
                    # English articles should use USD (integer or decimal values)
                    if not isinstance(price_value, (int, float)) or price_value < 0:
                        price_issues.append("English articles should use non-negative USD values")
            
            if not is_price_valid or price_issues:
                review.issues.extend(price_issues)
                # Only add to missing_price_files if it passes date filter
                should_add = True
                
                if self.before_datetime:
                    try:
                        # Handle both string and datetime.date objects
                        review_date = None
                        if isinstance(review.date, str):
                            review_date = datetime.strptime(review.date, '%Y-%m-%d')
                        elif hasattr(review.date, 'date'):  # datetime.date object
                            review_date = datetime.combine(review.date, time.min)
                        
                        if review_date and review_date > self.before_datetime:
                            should_add = False  # Skip files outside date range
                    except (ValueError, AttributeError):
                        # If date parsing fails, include the file
                        pass
                
                if should_add:
                    self.missing_price_files.append(review)
            
            return review
            
        except Exception as e:
            print(f"[ERROR] Failed to validate {file_path}: {e}")
            return None

    def check_all_files(self) -> None:
        """Check all product review files for missing price metadata"""
        print("Scanning for product review files...")
        
        product_files = self.find_product_review_files()
        print(f"Found {len(product_files)} potential product review files")
        
        files_with_price = 0
        files_without_price = 0
        
        for file_path in product_files:
            front_matter = self.parse_front_matter(file_path)
            if front_matter:
                review = self.validate_product_review(file_path, front_matter)
                if review:
                    self.product_reviews.append(review)
                    
                    # Count files with/without price
                    if front_matter.get('price') is not None:
                        files_with_price += 1
                    else:
                        files_without_price += 1
        
        print(f"Processed {len(self.product_reviews)} product review files")
        print(f"Files with price: {files_with_price}")
        print(f"Files without price: {files_without_price}")
        print(f"Found {len(self.missing_price_files)} files with missing or invalid price metadata")

    def generate_statistics(self) -> Dict:
        """Generate detailed statistics about the missing price files"""
        # Apply date filtering to statistics if specified
        filtered_missing_files = []
        filtered_total_files = []
        
        for review in self.product_reviews:
            include_in_stats = True
            
            if self.before_datetime:
                try:
                    review_date = None
                    if isinstance(review.date, str):
                        review_date = datetime.strptime(review.date, '%Y-%m-%d')
                    elif hasattr(review.date, 'date'):
                        review_date = datetime.combine(review.date, time.min)
                    
                    if review_date and review_date > self.before_datetime:
                        include_in_stats = False
                except (ValueError, AttributeError):
                    pass
            
            if include_in_stats:
                filtered_total_files.append(review)
                if review in self.missing_price_files:
                    filtered_missing_files.append(review)
        
        stats = {
            'total_files': len(filtered_total_files),
            'missing_price_files': len(filtered_missing_files),
            'completion_rate': 0.0,
            'by_language': defaultdict(int),
            'by_company': defaultdict(int),
            'by_year': defaultdict(int),
            'by_month': defaultdict(int)
        }
        
        if stats['total_files'] > 0:
            stats['completion_rate'] = ((stats['total_files'] - stats['missing_price_files']) / stats['total_files']) * 100
        
        for review in filtered_missing_files:
            # Language statistics
            stats['by_language'][review.lang] += 1
            
            # Company statistics
            stats['by_company'][review.company_id] += 1
            
            # Date statistics
            try:
                if isinstance(review.date, str):
                    # Handle various date formats
                    date_formats = [
                        '%Y-%m-%d', 
                        '%Y-%m-%d %H:%M:%S', 
                        '%Y-%m-%dT%H:%M:%S',
                        '%Y-%m-%d %H:%M',
                        '%Y-%m-%dT%H:%M',
                        '%Y/%m/%d',
                        '%Y/%m/%d %H:%M:%S'
                    ]
                    date_obj = None
                    for fmt in date_formats:
                        try:
                            date_obj = datetime.strptime(review.date, fmt)
                            break
                        except ValueError:
                            continue
                    
                    if date_obj:
                        stats['by_year'][date_obj.year] += 1
                        stats['by_month'][date_obj.month] += 1
                elif hasattr(review.date, 'date'):
                    # Handle datetime.date objects
                    stats['by_year'][review.date.year] += 1
                    stats['by_month'][review.date.month] += 1
                elif hasattr(review.date, 'year') and hasattr(review.date, 'month'):
                    # Handle datetime.date objects (alternative check)
                    stats['by_year'][review.date.year] += 1
                    stats['by_month'][review.date.month] += 1
            except (ValueError, AttributeError):
                pass
        
        return stats

    def print_statistics(self) -> None:
        """Print detailed statistics about missing price files"""
        stats = self.generate_statistics()
        
        print("\n" + "=" * 60)
        print("MISSING PRICE METADATA STATISTICS")
        print("=" * 60)
        
        print(f"Total product review files: {stats['total_files']}")
        print(f"Files missing price metadata: {stats['missing_price_files']}")
        print(f"Completion rate: {stats['completion_rate']:.1f}%")
        
        if stats['missing_price_files'] > 0:
            print(f"\nMissing price files by language:")
            for lang, count in sorted(stats['by_language'].items()):
                print(f"  {lang.upper()}: {count} files")
            
            print(f"\nTop 10 companies with missing price metadata:")
            sorted_companies = sorted(stats['by_company'].items(), key=lambda x: x[1], reverse=True)
            for company, count in sorted_companies[:10]:
                try:
                    print(f"  {company}: {count} files")
                except UnicodeEncodeError:
                    safe_company = company.encode('utf-8', errors='replace').decode('utf-8')
                    print(f"  {safe_company}: {count} files")
            
            if stats['by_year']:
                print(f"\nMissing price files by year:")
                for year in sorted(stats['by_year'].keys()):
                    print(f"  {year}: {stats['by_year'][year]} files")
            
            if stats['by_month']:
                print(f"\nMissing price files by month:")
                month_names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                for month in sorted(stats['by_month'].keys()):
                    print(f"  {month_names[month-1]}: {stats['by_month'][month]} files")
        
        print("\n" + "=" * 60)
        print("RECOMMENDATIONS:")
        print("1. Add 'price: [value]' to the front matter of each file")
        print("2. Use JPY for Japanese articles, USD for English articles")
        print("3. Price must be a non-negative number (0 is allowed for free products)")
        print("4. Price should match the denominator used in cost-performance calculations")
        print("=" * 60)

    def safe_print(self, text: str) -> None:
        """Safely print text handling encoding issues"""
        try:
            print(text)
        except (UnicodeEncodeError, OSError) as e:
            # Convert to ASCII-safe string
            try:
                safe_text = text.encode('utf-8', errors='replace').decode('utf-8')
                print(safe_text)
            except:
                # Final fallback: convert to ASCII
                safe_text = text.encode('ascii', errors='ignore').decode('ascii')
                print(safe_text)

    def print_results(self, verbose: bool = False) -> None:
        """Print the results of the check"""
        if not self.missing_price_files:
            self.safe_print("All product review files have price metadata!")
            return
        
        if verbose:
            self.safe_print(f"\nFound {len(self.missing_price_files)} product review files missing price metadata:")
            self.safe_print("=" * 80)
            
            for review in self.missing_price_files:
                try:
                    relative_path = os.path.relpath(review.file_path, self.base_path)
                    self.safe_print(f"\nFile: {relative_path}")
                    
                    # Safe string handling for Windows console
                    def safe_print_field(label: str, value) -> None:
                        try:
                            self.safe_print(f"   {label}: {value}")
                        except (UnicodeEncodeError, OSError):
                            # Convert to ASCII-safe string
                            safe_value = str(value).encode('utf-8', errors='replace').decode('utf-8')
                            self.safe_print(f"   {label}: {safe_value}")
                    
                    safe_print_field("Title", review.title)
                    safe_print_field("Language", review.lang)
                    safe_print_field("Date", review.date)
                    safe_print_field("Company ID", review.company_id)
                    safe_print_field("Reference", review.ref)
                    safe_print_field("Permalink", review.permalink)
                    safe_print_field("Rating", review.rating)
                    
                    # Handle tags safely
                    try:
                        self.safe_print(f"   Tags: {review.tags}")
                    except (UnicodeEncodeError, OSError):
                        safe_tags = []
                        for tag in review.tags:
                            safe_tags.append(str(tag).encode('utf-8', errors='replace').decode('utf-8'))
                        self.safe_print(f"   Tags: {safe_tags}")
                    
                    for issue in review.issues:
                        safe_print_field("Issue", issue)
                        
                except Exception as e:
                    # If any error occurs, just print the basic file path
                    try:
                        relative_path = os.path.relpath(review.file_path, self.base_path)
                        self.safe_print(f"\nFile: {relative_path}")
                        self.safe_print(f"   Error displaying details: {str(e)}")
                    except:
                        self.safe_print(f"\nFile: [Error displaying path]")
            
            self.safe_print("\n" + "=" * 80)
            self.safe_print("To fix these issues:")
            self.safe_print("   1. Add 'price: [value]' to the front matter of each file")
            self.safe_print("   2. Ensure the price matches the denominator used in cost-performance calculations")
            self.safe_print("   3. Use JPY for Japanese articles, USD for English articles")
            self.safe_print("   4. Price must be a non-negative number (0 is allowed for free products)")
        else:
            # Default output: just file paths for piping to other tools
            for review in self.missing_price_files:
                try:
                    relative_path = os.path.relpath(review.file_path, self.base_path)
                    # Convert to UTF-8-safe path to avoid encoding issues
                    safe_path = relative_path.encode('utf-8', errors='replace').decode('utf-8')
                    self.safe_print(safe_path)
                except (OSError, UnicodeEncodeError):
                    # Fallback: print just the filename
                    try:
                        filename = os.path.basename(review.file_path)
                        safe_filename = filename.encode('utf-8', errors='replace').decode('utf-8')
                        self.safe_print(f"_products/{review.lang}/{review.company_id}/{safe_filename}")
                    except (OSError, UnicodeEncodeError):
                        # Final fallback: just print the basic info
                        self.safe_print(f"_products/{review.lang}/{review.company_id}/[filename]")

    def generate_fix_report(self) -> None:
        """Generate a detailed report with suggested fixes"""
        if not self.missing_price_files:
            self.safe_print("No fixes needed - all files have price metadata!")
            return
        
        report_path = self.base_path / "missing_price_report.md"
        
        with open(report_path, 'w', encoding='utf-8') as f:
            f.write("# Missing Price Metadata Report\n\n")
            f.write(f"Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
            f.write(f"Total files with missing price metadata: {len(self.missing_price_files)}\n\n")
            
            f.write("## Files Requiring Price Metadata\n\n")
            
            for review in self.missing_price_files:
                relative_path = os.path.relpath(review.file_path, self.base_path)
                f.write(f"### {relative_path}\n\n")
                f.write(f"- **Title**: {review.title}\n")
                f.write(f"- **Language**: {review.lang}\n")
                f.write(f"- **Date**: {review.date}\n")
                f.write(f"- **Company ID**: {review.company_id}\n")
                f.write(f"- **Reference**: {review.ref}\n\n")
                
                f.write("**Required Action**: Add price metadata to front matter\n\n")
                f.write("```yaml\n")
                f.write("price: [INSERT_PRICE_HERE]  # JPY for Japanese, USD for English\n")
                f.write("```\n\n")
                f.write("**Note**: Price should match the denominator used in cost-performance calculations\n\n")
                f.write("---\n\n")
        
        self.safe_print(f"Detailed report generated: {report_path}")

def main():
    parser = argparse.ArgumentParser(description='Check for missing price metadata in product reviews')
    parser.add_argument('-v', '--verbose', action='store_true', 
                       help='Verbose output with detailed file information')
    parser.add_argument('--fix', action='store_true',
                       help='Generate a detailed fix report')
    parser.add_argument('--before', type=str,
                       help='Check only files dated on/before this date (YYYY-MM-DD[THH:MM[:SS]])')
    parser.add_argument('--stats', action='store_true',
                       help='Show detailed statistics about missing price files')
    
    args = parser.parse_args()
    
    checker = MissingPriceChecker(before=args.before)
    checker.check_all_files()
    
    if args.stats:
        checker.print_statistics()
    
    if not args.stats:  # Only print results if not showing stats
        checker.print_results(verbose=args.verbose)
    
    if args.fix:
        checker.generate_fix_report()

if __name__ == "__main__":
    main()
