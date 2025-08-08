#!/usr/bin/env python3
"""
Audio Review Integrity Check Script

This script provides the following functionality:
1. Automatic search and parsing of all review files
2. Consistency check between overall score and sum of individual evaluation criteria
3. Compliance check with review policy (dev/review_policy.md)
4. Generation of detailed validation reports

Usage:
    python review_validator.py                    # Validate all files
    python review_validator.py -f path/to/file.md # Validate single file
"""

import os
import re
import yaml
import glob
import argparse
from pathlib import Path
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass, field
from datetime import datetime, date

@dataclass
class ReviewData:
    """Class to store review data"""
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
    
    # Evaluation criteria scores (extracted from rating array)
    total_score: float = 0.0
    individual_scores: List[float] = field(default_factory=list)
    
    # Validation results
    issues: List[str] = field(default_factory=list)
    
    # Product identifier for cross-language comparison
    product_id: str = ""

class ReviewValidator:
    """Review file validation class"""
    
    def __init__(self, base_path: str = ".."):
        self.base_path = Path(base_path).resolve()
        # If running from tools directory, adjust the path
        if self.base_path.name == "tools":
            self.base_path = self.base_path.parent
        # Allow switching master policy via environment variable; default to v3
        policy_rel = os.environ.get("REVIEW_POLICY_FILE", "dev/review_policy_v3.md")
        self.policy_path = self.base_path / policy_rel
        self.reviews: List[ReviewData] = []
        self.policy_requirements = self._load_policy_requirements()
    
    def _load_policy_requirements(self) -> Dict:
        """Load review policy requirements"""
        requirements = {
            "rating_count": 6,  # Overall + 5 evaluation criteria
            "score_range": (0.0, 1.0),  # Score range for each evaluation criterion
            "required_sections_ja": [
                "概要",
                "科学的有効性", 
                "技術レベル",
                "コストパフォーマンス",
                "信頼性・サポート",
                "設計思想の合理性",
                "アドバイス"
            ],
            "required_sections_en": [
                "Overview",
                "Scientific Validity", 
                "Technology Level",
                "Cost-Performance",
                "Reliability & Support",
                "Rationality of Design Philosophy",
                "Advice"
            ],
            "required_fields": [
                "layout", "title", "target_name", "company_id", 
                "lang", "ref", "date", "rating", "summary", 
                "tags", "permalink"
            ],
            "layouts": ["company", "product"],
            "languages": ["ja", "en"],
            "date_format": r"^\d{4}-\d{2}-\d{2}$",
            "forbidden_symbols": ["$", "\\"],  # Backslash and dollar sign are forbidden
            "forbidden_terms": ["基準表", "benchmark table", "criteria table"],  # Forbidden terms in content
            "cp_formula_check": True,  # Check CP = cheapest_equivalent_price / target_price
            "cp_max_value": 1.0  # CP must not exceed 1.0
        }
        
        # Load more detailed requirements from policy file if it exists
        if self.policy_path.exists():
            with open(self.policy_path, 'r', encoding='utf-8') as f:
                policy_content = f.read()
                # Extract additional requirements from policy file
                requirements["policy_content"] = policy_content
        
        return requirements
    
    def find_review_files(self) -> List[str]:
        """Search for review files"""
        patterns = [
            "_companies/**/*.md",
            "_products/**/*.md"
        ]
        
        files = []
        for pattern in patterns:
            search_path = str(self.base_path / pattern)
            print(f"Searching for files with pattern: {search_path}")
            found_files = glob.glob(search_path, recursive=True)
            print(f"Found {len(found_files)} files for pattern {pattern}")
            files.extend(found_files)
        
        print(f"Total files found: {len(files)}")
        return sorted(files)
    
    def _extract_product_id(self, file_path: str) -> str:
        """Extract product identifier from file path for cross-language comparison"""
        path = Path(file_path)
        parts = path.parts
        
        # For product reviews: _products/[lang]/[company]/[product].md
        if "_products" in parts:
            # Find the index of _products
            products_index = parts.index("_products")
            if len(parts) > products_index + 3:
                # Extract company and product name
                company = parts[products_index + 2]
                product_file = parts[products_index + 3]
                product_name = product_file.replace('.md', '')
                return f"{company}/{product_name}"
        
        # For company reviews: _companies/[lang]/[company].md
        elif "_companies" in parts:
            companies_index = parts.index("_companies")
            if len(parts) > companies_index + 2:
                company_file = parts[companies_index + 2]
                company_name = company_file.replace('.md', '')
                return f"company/{company_name}"
        
        return ""

    def _find_counterpart_file(self, file_path: str) -> Optional[str]:
        """Find the corresponding file in the other language."""
        p = Path(file_path)
        parts = list(p.parts) # Make it mutable

        try:
            # Find the index of the collection directory
            if '_products' in parts:
                base_index = parts.index('_products')
            elif '_companies' in parts:
                base_index = parts.index('_companies')
            else:
                return None

            # The language directory should be right after the collection directory
            lang_index = base_index + 1
            if lang_index < len(parts):
                lang = parts[lang_index]
                if lang == 'ja':
                    parts[lang_index] = 'en'
                elif lang == 'en':
                    parts[lang_index] = 'ja'
                else:
                    return None # This path does not seem to have the expected lang component

                return str(Path(*parts))
            else:
                return None
        except ValueError:
            # '_products' or '_companies' not found in path parts.
            return None

    def parse_review_file(self, file_path: str) -> Optional[ReviewData]:
        """Parse review file and create ReviewData object"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Extract front matter
            if not content.startswith('---'):
                return None
            
            # Find the end position of front matter
            end_match = re.search(r'\n---\n', content)
            if not end_match:
                return None
            
            front_matter = content[3:end_match.start()]
            body = content[end_match.end():]
            
            # Parse YAML
            try:
                metadata = yaml.safe_load(front_matter)
            except yaml.YAMLError as e:
                print(f"YAML parse error in {file_path}: {e}")
                return None
            
            # Create ReviewData object
            review = ReviewData(
                file_path=file_path,
                layout=metadata.get('layout', ''),
                title=metadata.get('title', ''),
                target_name=metadata.get('target_name', ''),
                company_id=metadata.get('company_id', ''),
                lang=metadata.get('lang', ''),
                ref=metadata.get('ref', ''),
                date=metadata.get('date', ''),
                rating=metadata.get('rating', []),
                summary=metadata.get('summary', ''),
                tags=metadata.get('tags', []),
                permalink=metadata.get('permalink', '')
            )
            
            # Extract product ID for cross-language comparison
            review.product_id = self._extract_product_id(file_path)
            
            # Convert rating to float
            if isinstance(review.rating, list) and len(review.rating) >= 1:
                review.total_score = float(review.rating[0])
                review.individual_scores = [float(x) for x in review.rating[1:]]
            
            return review
            
        except Exception as e:
            print(f"Error parsing {file_path}: {e}")
            return None
    
    def validate_score_consistency(self, review: ReviewData) -> List[str]:
        """Check score consistency"""
        issues = []
        
        if not review.rating:
            issues.append("Rating array is empty")
            return issues
        
        if len(review.rating) != self.policy_requirements["rating_count"]:
            issues.append(f"Invalid rating array length (expected: {self.policy_requirements['rating_count']}, actual: {len(review.rating)})")
        
        if not review.individual_scores:
            issues.append("Individual scores are not extracted")
            return issues
            
        # Calculate expected total score as the sum of individual scores
        expected_total_score = sum(review.individual_scores)
        
        # Use a tolerance for floating point comparison
        tolerance = 0.01

        if abs(review.total_score - expected_total_score) > tolerance:
            issues.append(f"Total score inconsistency (expected sum: {expected_total_score:.2f}, actual: {review.total_score})")
            
        for score in review.individual_scores:
            if not (self.policy_requirements["score_range"][0] <= score <= self.policy_requirements["score_range"][1]):
                issues.append(f"Individual score {score} is out of range")
        
        # Check if all scores are in 0.1 increments
        all_scores = [review.total_score] + review.individual_scores
        for i, score in enumerate(all_scores):
            # Check if score is a multiple of 0.1
            if abs(score - round(score, 1)) > 0.001:  # Small tolerance for floating point precision
                score_type = "Total score" if i == 0 else f"Individual score {i}"
                issues.append(f"{score_type} must be in 0.1 increments (current: {score}, should be: {round(score, 1)})")
        
        return issues
    
    def validate_policy_compliance(self, review: ReviewData) -> List[str]:
        """Check compliance with review policy"""
        issues = []
        
        # Check required fields
        for field in self.policy_requirements["required_fields"]:
            if not hasattr(review, field) or not getattr(review, field):
                issues.append(f"Required field '{field}' is not set")
        
        # Check layout validity
        if review.layout not in self.policy_requirements["layouts"]:
            issues.append(f"Invalid layout value: {review.layout} (allowed values: {self.policy_requirements['layouts']})")
        
        # Check language code validity
        if review.lang not in self.policy_requirements["languages"]:
            issues.append(f"Invalid language code: {review.lang} (allowed values: {self.policy_requirements['languages']})")
        
        # Check date format
        if review.date and not re.match(self.policy_requirements["date_format"], str(review.date)):
            issues.append(f"Invalid date format: {review.date} (expected format: YYYY-MM-DD)")
        
        # Check file placement
        path_parts = Path(review.file_path).parts
        if review.layout == "company" and "_companies" not in path_parts:
            issues.append("Company reviews must be placed in _companies directory")
        elif review.layout == "product" and "_products" not in path_parts:
            issues.append("Product reviews must be placed in _products directory")
        
        # Check permalink
        if review.layout == "company":
            expected_prefix = f"/companies/{review.lang}/"
        elif review.layout == "product":
            expected_prefix = f"/products/{review.lang}/"
        else:
            expected_prefix = f"/{review.layout}s/{review.lang}/"
        
        if not review.permalink.startswith(expected_prefix):
            issues.append(f"Invalid permalink format (expected: {expected_prefix}*, actual: {review.permalink})")
        
        # Check permalink structure (should not exceed 3 levels)
        issues.extend(self.validate_permalink_structure(review))
        
        return issues
    
    def validate_permalink_structure(self, review: ReviewData) -> List[str]:
        """Check if permalink structure does not exceed 3 levels"""
        issues = []
        
        if review.permalink:
            # Remove leading and trailing slashes and split by '/'
            permalink_parts = review.permalink.strip('/').split('/')
            
            # Expected structure: [products/companies]/[lang]/[ref] = 3 levels maximum
            if len(permalink_parts) > 3:
                issues.append(f"Permalink structure exceeds 3 levels: {review.permalink} (has {len(permalink_parts)} levels)")
        
        return issues
    
    def validate_date_consistency(self, review: ReviewData) -> List[str]:
        """Check date consistency between metadata and article end"""
        issues = []
        
        try:
            with open(review.file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Extract body content (after front matter)
            end_match = re.search(r'\n---\n', content)
            if end_match:
                body_content = content[end_match.end():]
            else:
                body_content = content
            
            # Find date in parentheses at the end of the article
            # Look for pattern like (2024-01-01) or (2024.01.01) or (2024.1.1) at the end
            end_date_pattern = r'\((\d{4}[-.]?\d{1,2}[-.]?\d{1,2})\)\s*$'
            end_date_match = re.search(end_date_pattern, body_content.strip())
            
            if end_date_match:
                end_date_str = end_date_match.group(1)
                # Normalize date format (replace dots with hyphens)
                end_date_str = end_date_str.replace('.', '-')
                
                # Normalize to YYYY-MM-DD format (pad single digits with zeros)
                try:
                    date_parts = end_date_str.split('-')
                    if len(date_parts) == 3:
                        year, month, day = date_parts
                        end_date_str = f"{year}-{month.zfill(2)}-{day.zfill(2)}"
                except:
                    pass  # Keep original format if parsing fails
                
                # Compare with metadata date
                metadata_date = str(review.date)
                if end_date_str != metadata_date:
                    issues.append(f"Date mismatch: metadata date ({metadata_date}) does not match article end date ({end_date_str})")
            else:
                issues.append("Article end date not found in expected format (YYYY-MM-DD) or (YYYY.MM.DD)")
        
        except Exception as e:
            issues.append(f"Error occurred during date consistency validation: {e}")
        
        return issues
    
    def validate_date_range(self, review: ReviewData) -> List[str]:
        """Check if dates are within valid range"""
        issues = []
        
        try:
            with open(review.file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Extract body content (after front matter)
            end_match = re.search(r'\n---\n', content)
            if end_match:
                body_content = content[end_match.end():]
            else:
                body_content = content
            
            # Site publication date
            site_launch_date = date(2025, 7, 5)
            current_date = date.today()
            
            # Check metadata date
            if review.date:
                try:
                    metadata_date_obj = datetime.strptime(str(review.date), '%Y-%m-%d').date()
                    
                    if metadata_date_obj < site_launch_date:
                        issues.append(f"Metadata date ({review.date}) is before site launch date (2025-07-05)")
                    
                    if metadata_date_obj > current_date:
                        issues.append(f"Metadata date ({review.date}) is in the future")
                
                except ValueError:
                    issues.append(f"Invalid metadata date format: {review.date}")
            
            # Check article end date
            end_date_pattern = r'\((\d{4}[-.]?\d{1,2}[-.]?\d{1,2})\)\s*$'
            end_date_match = re.search(end_date_pattern, body_content.strip())
            
            if end_date_match:
                end_date_str = end_date_match.group(1).replace('.', '-')
                
                # Normalize to YYYY-MM-DD format (pad single digits with zeros)
                try:
                    date_parts = end_date_str.split('-')
                    if len(date_parts) == 3:
                        year, month, day = date_parts
                        end_date_str = f"{year}-{month.zfill(2)}-{day.zfill(2)}"
                except:
                    pass  # Keep original format if parsing fails
                
                try:
                    end_date_obj = datetime.strptime(end_date_str, '%Y-%m-%d').date()
                    
                    if end_date_obj < site_launch_date:
                        issues.append(f"Article end date ({end_date_str}) is before site launch date (2025-07-05)")
                    
                    if end_date_obj > current_date:
                        issues.append(f"Article end date ({end_date_str}) is in the future")
                
                except ValueError:
                    issues.append(f"Invalid article end date format: {end_date_str}")
        
        except Exception as e:
            issues.append(f"Error occurred during date range validation: {e}")
        
        return issues
    
    def validate_content_structure(self, review: ReviewData) -> List[str]:
        """Check content structure"""
        issues = []
        
        try:
            with open(review.file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Check existence of required sections (by language)
            if review.lang == "ja":
                required_sections = self.policy_requirements["required_sections_ja"]
            elif review.lang == "en":
                required_sections = self.policy_requirements["required_sections_en"]
            else:
                required_sections = self.policy_requirements["required_sections_ja"]  # Default to Japanese
            
            # Extract actual sections from content using regex to handle optional text in parentheses
            actual_sections = [re.match(r"##\s*([^（(]+)", line).group(1).strip() for line in content.split('\n') if line.startswith("## ")]

            # 1. Check for existence of required sections
            missing_sections = [s for s in required_sections if s not in actual_sections]
            for section in missing_sections:
                issues.append(f"Required section '{section}' not found")

            # 2. Check the order of existing sections
            # Filter actual_sections to only include those that are in required_sections to check their order
            filtered_actual_sections = [s for s in actual_sections if s in required_sections]
            
            # Find the expected order of the found sections
            expected_order = [s for s in required_sections if s in filtered_actual_sections]

            if filtered_actual_sections != expected_order:
                issues.append(f"Sections are out of order. Expected: {expected_order}, Actual: {filtered_actual_sections}")

            # 3. Original checks for score display etc.
            score_sections = required_sections[1:6]  # 5 evaluation criteria
            for i, section in enumerate(score_sections):
                # Use regex to find the section header, ignoring potential parenthesized text
                section_pattern = re.compile(f"## {re.escape(section)}(?:[（(].*?[）)])?", re.DOTALL)
                if re.search(section_pattern, content):
                    # Search for $$ \Large \text{score} $$ pattern
                    section_match_pattern = re.compile(f"## {re.escape(section)}(?:[（(].*?[）)])?.*?(?=## |$)", re.DOTALL)
                    section_match = re.search(section_match_pattern, content)
                    if section_match:
                        section_content = section_match.group(0)
                        score_pattern = r'\$\$ \\Large \\text\{([\d.]+)\} \$\$'
                        score_match = re.search(score_pattern, section_content)
                        if score_match:
                            displayed_score = float(score_match.group(1))
                            if i < len(review.individual_scores):
                                actual_score = review.individual_scores[i]
                                if abs(displayed_score - actual_score) > 0.01:
                                    issues.append(f"Displayed score ({displayed_score}) in section '{section}' does not match rating score ({actual_score})")
                        else:
                            issues.append(f"Score display not found in section '{section}'")
            
            # Check for potential LaTeX issues caused by unescaped USD symbols
            issues.extend(self.validate_latex_issues(content))
            
            # Check CP calculation consistency and product category appropriateness
            issues.extend(self.validate_cp_calculation(review, content))
            
            # Check product category appropriateness for CP comparison
            issues.extend(self.validate_product_category_consistency(review, content))
        
        except Exception as e:
            issues.append(f"Error occurred during content structure validation: {e}")
        
        return issues
    
    def validate_latex_issues(self, content: str) -> List[str]:
        """Check for potential LaTeX issues caused by USD symbols"""
        issues = []
        
        # Extract content after front matter
        end_match = re.search(r'\n---\n', content)
        if end_match:
            body_content = content[end_match.end():]
        else:
            body_content = content
        
        # v2 policy: Dollar signs are absolutely forbidden (even with escaping)
        # Find any dollar signs
        dollar_pattern = r'\$'
        
        # Find all dollar sign matches
        dollar_matches = re.finditer(dollar_pattern, body_content)
        
        for match in dollar_matches:
            line_num = body_content[:match.start()].count('\n') + 1
            context_start = max(0, match.start() - 20)
            context_end = min(len(body_content), match.end() + 20)
            context = body_content[context_start:context_end].strip()
            
            # Skip if it's part of a LaTeX score display ($$\Large\text{score}$$)
            if r'\Large \text{' in context and '$$' in context:
                continue
            
            issues.append(f"Forbidden dollar sign detected at line {line_num}: '{context}' (Use 'USD' or 'JPY' instead - dollar signs are forbidden even with escaping)")
        
        # Check for backslash (also forbidden)
        backslash_pattern = r'\\'
        backslash_matches = re.finditer(backslash_pattern, body_content)
        
        for match in backslash_matches:
            line_num = body_content[:match.start()].count('\n') + 1
            context_start = max(0, match.start() - 20)
            context_end = min(len(body_content), match.end() + 20)
            context = body_content[context_start:context_end].strip()
            
            # Skip if it's part of a LaTeX score display ($$\Large\text{score}$$)
            if r'\Large \text{' in context and '$$' in context:
                continue
            
            issues.append(f"Forbidden backslash detected at line {line_num}: '{context}' (Backslashes are forbidden - use alternative notation)")
        
        return issues

    def validate_summary_latex_issues(self, text: str) -> List[str]:
        """Check for potential LaTeX issues caused by USD symbols in summary or other metadata"""
        issues = []
        
        # v2 policy: Dollar signs are absolutely forbidden (even with escaping)
        dollar_pattern = r'\$'
        
        # Find all dollar sign matches
        dollar_matches = re.finditer(dollar_pattern, text)
        
        for match in dollar_matches:
            context_start = max(0, match.start() - 20)
            context_end = min(len(text), match.end() + 20)
            context = text[context_start:context_end].strip()
            
            issues.append(f"Forbidden dollar sign detected in summary: '{context}' (Use 'USD' or 'JPY' instead - dollar signs are forbidden even with escaping)")
        
        # Check for backslash (also forbidden)
        backslash_pattern = r'\\'
        backslash_matches = re.finditer(backslash_pattern, text)
        
        for match in backslash_matches:
            context_start = max(0, match.start() - 20)
            context_end = min(len(text), match.end() + 20)
            context = text[context_start:context_end].strip()
            
            issues.append(f"Forbidden backslash detected in summary: '{context}' (Backslashes are forbidden - use alternative notation)")
        
        return issues
    
    def validate_cp_calculation(self, review: ReviewData, content: str) -> List[str]:
        """Check CP calculation consistency and formula correctness"""
        issues = []
        
        if len(review.individual_scores) < 3:  # CP is the 3rd score (index 2)
            return issues
        
        cp_score = review.individual_scores[2]  # Cost-Performance score
        
        # Check if CP exceeds 1.0 (calculation error)
        if cp_score > self.policy_requirements["cp_max_value"]:
            issues.append(f"CP score exceeds maximum allowed value ({cp_score} > {self.policy_requirements['cp_max_value']}) - this indicates calculation error")
        
        # Extract CP section content
        cp_section_pattern = r'## コストパフォーマンス.*?(?=## |$)' if review.lang == 'ja' else r'## Cost-Performance.*?(?=## |$)'
        cp_section_match = re.search(cp_section_pattern, content, re.DOTALL)
        
        if cp_section_match:
            cp_section = cp_section_match.group(0)
            
            # Check for CP calculation formula (CP = cheapest_price / target_price)
            # Look for patterns like "CP = X円 ÷ Y円" or "CP = X USD / Y USD"
            cp_formula_pattern = r'CP\s*=\s*([\d,]+)\s*[円USD]\s*[÷/]\s*([\d,]+)\s*[円USD]'
            cp_formula_match = re.search(cp_formula_pattern, cp_section)
            
            if cp_formula_match:
                try:
                    numerator = float(cp_formula_match.group(1).replace(',', ''))
                    denominator = float(cp_formula_match.group(2).replace(',', ''))
                    calculated_cp = numerator / denominator
                    
                    # Check if formula is correct (cheapest / target, not target / cheapest)
                    if calculated_cp > 1.0:
                        issues.append(f"CP calculation formula error: result ({calculated_cp:.3f}) > 1.0 indicates numerator/denominator are swapped")
                        
                except (ValueError, ZeroDivisionError):
                    issues.append("CP calculation formula contains invalid numbers")
            # Note: CP calculation formula is not strictly required - removed overly strict check
        
        return issues
    
    def validate_product_category_consistency(self, review: ReviewData, content: str) -> List[str]:
        """Check product category consistency for CP comparisons"""
        issues = []
        
        # Extract CP section content
        cp_section_pattern = r'## コストパフォーマンス.*?(?=## |$)' if review.lang == 'ja' else r'## Cost-Performance.*?(?=## |$)'
        cp_section_match = re.search(cp_section_pattern, content, re.DOTALL)
        
        if cp_section_match:
            cp_section = cp_section_match.group(0)
            
            # Note: Product category mismatch check has been removed as it cannot be reliably detected from text
        
        return issues
    
    def validate_title_target_name_consistency(self, review: ReviewData) -> List[str]:
        """Check if the first part of title matches target_name"""
        issues = []
        
        if not review.title or not review.target_name:
            return issues
        
        # Get the first part of title with the same length as target_name
        title_first_part = review.title[:len(review.target_name)]
        
        # Compare with target_name (case-insensitive)
        if title_first_part.lower() != review.target_name.lower():
            issues.append(f"Title first part '{title_first_part}' does not match target_name '{review.target_name}'")
        
        return issues
    
    def validate_forbidden_terms(self, review: ReviewData) -> List[str]:
        """Check for forbidden terms in content"""
        issues = []
        
        try:
            with open(review.file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Extract body content (after front matter)
            end_match = re.search(r'\n---\n', content)
            if end_match:
                body_content = content[end_match.end():]
            else:
                body_content = content
            
            # Check for forbidden terms
            for term in self.policy_requirements["forbidden_terms"]:
                if term in body_content:
                    # Find line number where the term appears
                    lines = body_content.split('\n')
                    for i, line in enumerate(lines, 1):
                        if term in line:
                            context_start = max(0, i - 1)
                            context_end = min(len(lines), i + 1)
                            context_lines = lines[context_start:context_end]
                            context = '\n'.join(context_lines).strip()
                            
                            issues.append(f"Forbidden term '{term}' detected at line {i}: '{context}' (Please replace with appropriate evaluation levels like '透明レベル', '問題レベル', 'transparent level', 'issue level', instead of using table/chart terminology) Rather than simply replacing strings, we create natural review text that takes context into consideration and does not use prohibited words.")
                            break  # Only report the first occurrence per term
            
        except Exception as e:
            issues.append(f"Error occurred during forbidden terms validation: {e}")
        
        return issues
    
    def validate_score_consistency_between_languages(self) -> List[str]:
        """Check score consistency between Japanese and English reviews of the same product"""
        issues = []
        
        # Group reviews by product ID
        product_reviews = {}
        for review in self.reviews:
            if review.product_id:
                if review.product_id not in product_reviews:
                    product_reviews[review.product_id] = {}
                product_reviews[review.product_id][review.lang] = review
        
        # Check for products with both Japanese and English reviews
        for product_id, lang_reviews in product_reviews.items():
            if 'ja' in lang_reviews and 'en' in lang_reviews:
                ja_review = lang_reviews['ja']
                en_review = lang_reviews['en']
                
                # Compare total scores
                if abs(ja_review.total_score - en_review.total_score) > 0.01:
                    issues.append(f"Cross-language score mismatch for {product_id}: "
                                f"Japanese total score ({ja_review.total_score}) != "
                                f"English total score ({en_review.total_score})")
                
                # Compare individual scores
                if len(ja_review.individual_scores) == len(en_review.individual_scores):
                    for i, (ja_score, en_score) in enumerate(zip(ja_review.individual_scores, en_review.individual_scores)):
                        if abs(ja_score - en_score) > 0.01:
                            issues.append(f"Cross-language score mismatch for {product_id} "
                                        f"evaluation criterion {i+1}: "
                                        f"Japanese score ({ja_score}) != English score ({en_score})")
                elif len(ja_review.individual_scores) != len(en_review.individual_scores):
                    issues.append(f"Cross-language evaluation criteria count mismatch for {product_id}: "
                                f"Japanese ({len(ja_review.individual_scores)}) != "
                                f"English ({len(en_review.individual_scores)})")
        
        return issues
    
    def validate_all_reviews(self) -> None:
        """Validate all review files"""
        print("Searching for review files...")
        files = self.find_review_files()
        print(f"Found {len(files)} files")
        
        self._validate_files(files)
    
    def validate_single_file(self, file_path: str) -> None:
        """Validate a single review file and its counterpart in the other language if it exists."""
        if not os.path.exists(file_path):
            print(f"[ERROR] File not found: {file_path}")
            return
        
        print(f"Validating single file: {file_path}")
        
        files_to_validate = [file_path]
        
        # Find the counterpart file in the other language
        counterpart_path = self._find_counterpart_file(file_path)
        if counterpart_path:
            if os.path.exists(counterpart_path):
                print(f"Found counterpart file, adding to validation: {counterpart_path}")
                files_to_validate.append(counterpart_path)
            else:
                print(f"Counterpart file not found at expected path: {counterpart_path}")
        
        self._validate_files(files_to_validate)
    
    def _validate_files(self, files: List[str]) -> None:
        """Common validation logic for multiple files"""
        for file_path in files:
            review = self.parse_review_file(file_path)
            
            if review is None:
                print(f"\n[WARNING] Failed to parse: {file_path}")
                continue
            
            # Execute various validations
            issues = []
            issues.extend(self.validate_score_consistency(review))
            issues.extend(self.validate_policy_compliance(review))
            issues.extend(self.validate_content_structure(review))
            # Check for USD symbol issues in summary
            issues.extend(self.validate_summary_latex_issues(review.summary))
            # Add new validations
            issues.extend(self.validate_date_consistency(review))
            issues.extend(self.validate_date_range(review))
            issues.extend(self.validate_title_target_name_consistency(review))
            issues.extend(self.validate_forbidden_terms(review))
            
            review.issues = issues
            self.reviews.append(review)
            
            # Display results only if there are issues
            if issues:
                print(f"\n[ERROR] Issues found in: {file_path}")
                print(f"  Issues: {len(issues)}")
                for issue in issues:
                    print(f"    - {issue}")
        
        # Check cross-language score consistency after all reviews are processed
        # (only if we have multiple files)
        if len(files) > 1:
            print("\n" + "="*50)
            print("Checking cross-language score consistency...")
            cross_lang_issues = self.validate_score_consistency_between_languages()
            
            if cross_lang_issues:
                print(f"[ERROR] Cross-language issues found: {len(cross_lang_issues)}")
                for issue in cross_lang_issues:
                    print(f"  - {issue}")
            else:
                print("[OK] Cross-language score consistency check passed")
    
    def generate_report(self) -> str:
        """Generate validation result report"""
        report = []
        report.append("# Audio Review Integrity Check Report")
        report.append(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        report.append("")
        
        # Summary statistics
        total_reviews = len(self.reviews)
        reviews_with_issues = len([r for r in self.reviews if r.issues])
        total_issues = sum(len(r.issues) for r in self.reviews)
        
        # Cross-language consistency check
        cross_lang_issues = self.validate_score_consistency_between_languages()
        
        report.append("## Summary Statistics")
        report.append(f"- Reviews validated: {total_reviews}")
        report.append(f"- Reviews with issues: {reviews_with_issues}")
        report.append(f"- Total issues detected: {total_issues}")
        report.append(f"- Cross-language consistency issues: {len(cross_lang_issues)}")
        if total_reviews > 0:
            report.append(f"- Compliance rate: {((total_reviews - reviews_with_issues) / total_reviews * 100):.1f}%")
        else:
            report.append("- Compliance rate: N/A (no reviews found)")
        report.append("")
        
        # Issue classification
        issue_categories = {}
        for review in self.reviews:
            for issue in review.issues:
                # Classify issue types
                if "overall score" in issue.lower() or "総合得点" in issue:
                    category = "Score Consistency Error"
                elif "required field" in issue.lower() or "required section" in issue.lower() or "必須フィールド" in issue or "必須セクション" in issue:
                    category = "Missing Required Elements"
                elif "out of range" in issue.lower() or "範囲外" in issue:
                    category = "Score Range Error"
                elif "format" in issue.lower() or "フォーマット" in issue or "形式" in issue:
                    category = "Format Error"
                elif "placement" in issue.lower() or "配置" in issue:
                    category = "File Placement Error"
                elif "cp calculation" in issue.lower() or "cp formula" in issue.lower():
                    category = "CP Calculation Error"
                elif "product category" in issue.lower() or "category mismatch" in issue.lower():
                    category = "Product Category Error"
                elif "0.1 increments" in issue.lower() or "score format" in issue.lower():
                    category = "Score Format Error"
                elif "latex" in issue.lower() or "dollar" in issue.lower() or "forbidden" in issue.lower() or "backslash" in issue.lower():
                    category = "Symbol Policy Violation"
                elif "permalink structure" in issue.lower() or "levels" in issue.lower():
                    category = "Permalink Structure Error"
                elif "date mismatch" in issue.lower() or "date not found" in issue.lower():
                    category = "Date Consistency Error"
                elif "before site launch" in issue.lower() or "in the future" in issue.lower():
                    category = "Date Range Error"
                elif "title first part" in issue.lower() or "does not match target_name" in issue.lower():
                    category = "Title Consistency Error"
                elif "forbidden term" in issue.lower():
                    category = "Forbidden Terms Policy Violation"
                else:
                    category = "Other"
                
                issue_categories[category] = issue_categories.get(category, 0) + 1
        
        # Add cross-language issues to categories
        for issue in cross_lang_issues:
            issue_categories["Cross-Language Score Mismatch"] = issue_categories.get("Cross-Language Score Mismatch", 0) + 1
        
        if issue_categories:
            report.append("## Issue Classification")
            for category, count in sorted(issue_categories.items(), key=lambda x: x[1], reverse=True):
                report.append(f"- {category}: {count} issues")
            report.append("")
        
        # Cross-language consistency issues
        if cross_lang_issues:
            report.append("## Cross-Language Score Consistency Issues")
            for issue in cross_lang_issues:
                report.append(f"- {issue}")
            report.append("")
        
        # Detailed results
        if reviews_with_issues > 0:
            report.append("## Detailed Validation Results")
            for review in self.reviews:
                if review.issues:
                    report.append(f"### {review.file_path}")
                    report.append(f"- Title: {review.title}")
                    report.append(f"- Language: {review.lang}")
                    report.append(f"- Product ID: {review.product_id}")
                    report.append(f"- Rating: {review.rating}")
                    report.append("- Issues:")
                    for issue in review.issues:
                        report.append(f"  - {issue}")
                    report.append("")
        
        # Recommended improvement actions
        report.append("\n## Recommended Improvement Actions")
        
        # Create a set of unique issue types for recommendations
        issue_types = set()
        for review in self.reviews:
            for issue in review.issues:
                # Extract the issue type (e.g., "Invalid rating array length")
                match = re.match(r"^([A-Za-z\s/]+)", issue)
                if match:
                    issue_types.add(match.group(1).strip())
        
        # Generate improvement recommendations based on issue types
        recommendations = {
            "Invalid rating array length": "1. **Score Consistency**: Ensure rating array length matches policy requirements",
            "Overall score and sum of individual evaluations do not match": "2. **Score Accuracy**: Verify that overall score equals the sum of individual evaluation scores",
            "Score for evaluation criterion": "3. **Score Range**: Check that all scores are within the valid range (0.0-1.0)",
            "Required field": "4. **Metadata Completeness**: Fill in all required metadata fields in the front matter",
            "Invalid layout value": "5. **Layout Compliance**: Use only allowed layout values (e.g., 'company', 'product')",
            "LaTeX/USD Symbol Error": "6. **Symbol Policy Violation**: Use 'USD' or 'JPY' instead of $ symbols - dollar signs and backslashes are forbidden",
            "Single dollar sign detected": "6. **Symbol Policy Violation**: Use 'USD' or 'JPY' instead of $ symbols - dollar signs and backslashes are forbidden",
            "Potential LaTeX issue detected": "6. **Symbol Policy Violation**: Use 'USD' or 'JPY' instead of $ symbols - dollar signs and backslashes are forbidden",
            "Forbidden dollar sign detected": "6. **Symbol Policy Violation**: Use 'USD' or 'JPY' instead of $ symbols - dollar signs and backslashes are forbidden",
            "Forbidden backslash detected": "6. **Symbol Policy Violation**: Use 'USD' or 'JPY' instead of $ symbols - dollar signs and backslashes are forbidden",
            "CP calculation formula error": "7. **CP Calculation Error**: Use correct formula CP = cheapest_equivalent_price / target_price",
            "Product category mismatch": "8. **Product Category Error**: Compare only products in the same category with equivalent functions",
            "must be in 0.1 increments": "9. **Score Format Error**: All scores must be in 0.1 increments (e.g., 0.1, 0.2, 0.3, etc.)",
            "Permalink structure exceeds": "10. **Permalink Structure Error**: Permalink should not exceed 3 levels (/products or companies/lang/ref/)",
            "Date mismatch": "11. **Date Consistency Error**: Metadata date must match article end date in parentheses",
            "Article end date not found": "11. **Date Consistency Error**: Article must end with date in parentheses (YYYY-MM-DD)",
            "before site launch": "12. **Date Range Error**: Dates must be between site launch date (2025-07-05) and current date",
            "in the future": "12. **Date Range Error**: Dates must be between site launch date (2025-07-05) and current date",
            "Title first part": "13. **Title Consistency Error**: Title first part must match target_name exactly",
            "Forbidden term": "14. **Forbidden Terms Policy Violation**: Replace table/chart terminology with appropriate evaluation levels like '透明レベル', '問題レベル', 'transparent level', 'issue level'"
        }
        
        # Get unique recommendations
        unique_recommendations = set()
        for issue_type in issue_types:
            for key, rec in recommendations.items():
                if issue_type.startswith(key):
                    unique_recommendations.add(rec)
        
        if unique_recommendations:
            for i, rec in enumerate(sorted(list(unique_recommendations))):
                report.append(rec)
        
        # If there are any LaTeX/USD symbol issues, add a note about the policy v2 requirements
        has_usd_issue = any("LaTeX/USD Symbol Error" in rec or "Forbidden dollar sign" in rec for rec in unique_recommendations)
        if has_usd_issue:
            report.append("\nNote: Policy v2 strictly forbids dollar signs ($) and backslashes (\\) even with escaping.")
            report.append("Use 'USD' or 'JPY' instead of $ symbols. Manual correction is required.")

        return "\n".join(report)
    
    def print_report(self) -> None:
        """Print report to console"""
        report_content = self.generate_report()
        print("\n" + "="*60)
        print(report_content)
        print("="*60)

def main():
    """Main function"""
    parser = argparse.ArgumentParser(
        description='Audio Review Integrity Check Script',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""Examples:
  python review_validator.py                           # Validate all files
  python review_validator.py -f _companies/ja/sony.md # Validate single file
  python review_validator.py --file ../path/to/file.md # Validate single file with relative path"""
    )
    
    parser.add_argument(
        '-f', '--file',
        type=str,
        help='Path to a single review file to validate'
    )
    
    args = parser.parse_args()
    
    print("[INFO] Starting audio review integrity check...")
    
    # Create validator with default path (root directory)
    validator = ReviewValidator(".")
    
    # Run validation based on arguments
    if args.file:
        validator.validate_single_file(args.file)
    else:
        validator.validate_all_reviews()
    
    # Generate and print report
    validator.print_report()
    
    print("\n[INFO] Validation complete!")

if __name__ == "__main__":
    main()