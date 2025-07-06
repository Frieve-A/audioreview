#!/usr/bin/env python3
"""
USD Symbol Fixer Script

This script fixes USD symbols ($) in review files to prevent LaTeX rendering issues.
- English files: Replace $123 with USD 123, fix USD $123 to USD 123
- Japanese files: Replace $123 with 123米ドル, fix USD $123 to USD 123
"""

import os
import re
import glob
from pathlib import Path

def fix_usd_symbols_in_text(text, is_japanese=False):
    """Fix USD symbols in text (for use in both content and summary)"""
    if is_japanese:
        # Japanese patterns
        # First fix existing USD $123 → USD 123
        text = re.sub(r'USD \$(\d+(?:[\.,]\d+)?)', r'USD \1', text)
        
        # Pattern: $123 → 123米ドル (but not if already preceded by USD)
        text = re.sub(r'(?<!USD )\$(\d+(?:[\.,]\d+)?)', r'\1米ドル', text)
        
        # Pattern: (~$123) → (~123米ドル)
        text = re.sub(r'\(~\$(\d+(?:[\.,]\d+)?)\)', r'(~\1米ドル)', text)
        
        # Pattern: （$123） → （123米ドル）
        text = re.sub(r'（\$(\d+(?:[\.,]\d+)?)', r'（\1米ドル', text)
        
        # Pattern: 約$123 → 約123米ドル
        text = re.sub(r'約\$(\d+(?:[\.,]\d+)?)', r'約\1米ドル', text)
        
        # Pattern: = $123 → = 123米ドル
        text = re.sub(r'= \$(\d+(?:[\.,]\d+)?)', r'= \1米ドル', text)
        
        # Pattern: ÷ $123 → ÷ 123米ドル
        text = re.sub(r'÷ \$(\d+(?:[\.,]\d+)?)', r'÷ \1米ドル', text)
        
    else:
        # English patterns
        # First fix existing USD $123 → USD 123
        text = re.sub(r'USD \$(\d+(?:[\.,]\d+)?)', r'USD \1', text)
        
        # Pattern: $123 → USD 123 (but not if already preceded by USD)
        text = re.sub(r'(?<!USD )\$(\d+(?:[\.,]\d+)?)', r'USD \1', text)
        
        # Pattern: (~$123) → (~USD 123)
        text = re.sub(r'\(~\$(\d+(?:[\.,]\d+)?)\)', r'(~USD \1)', text)
        
        # Pattern: approximately $123 → approximately USD 123
        text = re.sub(r'approximately \$(\d+(?:[\.,]\d+)?)', r'approximately USD \1', text)
        
        # Pattern: = $123 → = USD 123
        text = re.sub(r'= \$(\d+(?:[\.,]\d+)?)', r'= USD \1', text)
        
        # Pattern: ÷ $123 → ÷ USD 123
        text = re.sub(r'÷ \$(\d+(?:[\.,]\d+)?)', r'÷ USD \1', text)
        
        # Pattern: under $123 → under USD 123
        text = re.sub(r'under \$(\d+(?:[\.,]\d+)?)', r'under USD \1', text)
        
        # Pattern: for $123 → for USD 123
        text = re.sub(r'for \$(\d+(?:[\.,]\d+)?)', r'for USD \1', text)
        
        # Pattern: at $123 → at USD 123
        text = re.sub(r'at \$(\d+(?:[\.,]\d+)?)', r'at USD \1', text)
        
        # Pattern: costing $123 → costing USD 123
        text = re.sub(r'costing \$(\d+(?:[\.,]\d+)?)', r'costing USD \1', text)
        
        # Pattern: sold for $123 → sold for USD 123
        text = re.sub(r'sold for \$(\d+(?:[\.,]\d+)?)', r'sold for USD \1', text)
        
        # Pattern: price $123 → price USD 123
        text = re.sub(r'price \$(\d+(?:[\.,]\d+)?)', r'price USD \1', text)
        
        # Clean up any double USD references
        text = re.sub(r'USD USD (\d+)', r'USD \1', text)
    
    return text

def fix_usd_symbols_in_content(content, is_japanese=False):
    """Fix USD symbols in content"""
    # Extract front matter and body
    if content.startswith('---'):
        end_match = re.search(r'\n---\n', content)
        if end_match:
            front_matter = content[:end_match.end()]
            body = content[end_match.end():]
        else:
            front_matter = ""
            body = content
    else:
        front_matter = ""
        body = content
    
    # Fix USD symbols in front matter (summary field only) - text-based approach
    if front_matter:
        # Find summary field and fix USD symbols in it
        summary_pattern = r'(summary:\s*["\'])(.*?)(["\'])'
        
        def fix_summary_match(match):
            prefix = match.group(1)
            summary_text = match.group(2)
            suffix = match.group(3)
            
            # Fix USD symbols in summary text
            fixed_summary = fix_usd_symbols_in_text(summary_text, is_japanese)
            
            return prefix + fixed_summary + suffix
        
        front_matter = re.sub(summary_pattern, fix_summary_match, front_matter, flags=re.DOTALL)
    
    # Fix USD symbols in body content
    body = fix_usd_symbols_in_text(body, is_japanese)
    
    return front_matter + body

def process_file(file_path):
    """Process a single file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            original_content = f.read()
        
        # Determine if it's a Japanese file
        is_japanese = '/ja/' in file_path.replace('\\', '/')
        
        # Check what needs to be fixed (for detailed feedback)
        summary_changed = False
        body_changed = False
        
        # Extract front matter and body to check separately
        if original_content.startswith('---'):
            end_match = re.search(r'\n---\n', original_content)
            if end_match:
                front_matter_content = original_content[:end_match.end()]
                body_content = original_content[end_match.end():]
                
                # Check if summary field needs fixing
                summary_pattern = r'(summary:\s*["\'])(.*?)(["\'])'
                summary_match = re.search(summary_pattern, front_matter_content, re.DOTALL)
                if summary_match:
                    original_summary = summary_match.group(2)
                    fixed_summary = fix_usd_symbols_in_text(original_summary, is_japanese)
                    if fixed_summary != original_summary:
                        summary_changed = True
                
                # Check if body needs fixing
                fixed_body = fix_usd_symbols_in_text(body_content, is_japanese)
                if fixed_body != body_content:
                    body_changed = True
        
        # Fix USD symbols
        fixed_content = fix_usd_symbols_in_content(original_content, is_japanese)
        
        # Only write if content changed
        if fixed_content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(fixed_content)
            
            # Provide detailed feedback
            changes = []
            if summary_changed:
                changes.append("summary")
            if body_changed:
                changes.append("body")
            
            change_desc = " + ".join(changes) if changes else "content"
            print(f"Fixed ({change_desc}): {file_path}")
            return True
        else:
            print(f"No changes needed: {file_path}")
            return False
    
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    """Main function"""
    base_path = Path("..")
    
    # Find all markdown files in companies and products directories
    patterns = [
        "_companies/**/*.md",
        "_products/**/*.md"
    ]
    
    files = []
    for pattern in patterns:
        files.extend(glob.glob(str(base_path / pattern), recursive=True))
    
    print(f"Found {len(files)} files to process")
    print("Processing files...")
    
    fixed_count = 0
    for file_path in sorted(files):
        if process_file(file_path):
            fixed_count += 1
    
    print(f"\nProcessing complete!")
    print(f"Fixed {fixed_count} files out of {len(files)} total files")
    
    if fixed_count > 0:
        print("\nFixed files will have USD symbols properly formatted:")
        print("- English: $123 → USD 123")
        print("- Japanese: $123 → 123米ドル")
        print("- Summary fields and content body are both processed")

if __name__ == "__main__":
    main() 