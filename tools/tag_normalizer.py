#!/usr/bin/env python3
"""
Tag Normalizer for AudioReview markdown files

This script detects and normalizes tag variations in markdown files
under _products and _companies directories. It processes tags lines
without parsing the entire YAML frontmatter.
"""

import os
import re
import argparse
from pathlib import Path
from collections import defaultdict
from typing import Dict, List, Set, Tuple
import json


class TagNormalizer:
    def __init__(self, root_dir: str = "."):
        self.root_dir = Path(root_dir)
        self.tag_variations = defaultdict(set)
        self.normalized_tags = {}
        self.file_tags = {}
        
        # Define normalization rules
        self.normalization_rules = {
            # Company name variations
            "7hz": "7HZ",
            "7Hz": "7HZ",
            "7HZ": "7HZ",
            
            # Product category variations
            "iem": "IEM",
            "Iem": "IEM",
            "IEM": "IEM",
            
            # Technology variations
            "planar magnetic": "Planar Magnetic",
            "planar-magnetic": "Planar Magnetic",
            "planarmagnetic": "Planar Magnetic",
            "Planar Magnetic": "Planar Magnetic",
            "プラナーマグネティック": "プラナーマグネティック",
            "プレーナーマグネティック": "プラナーマグネティック",
            "プレーナー磁界型": "プラナーマグネティック",
            "プラナー磁気": "プラナーマグネティック",
            
            # Price category variations
            "budget": "Budget",
            "Budget": "Budget",
            "低価格": "低価格",
            "安価": "低価格",
            "エントリー": "低価格",
            
            # Product type variations
            "headphones": "Headphones",
            "Headphones": "Headphones",
            "headphone": "Headphones",
            "Headphone": "Headphones",
            "ヘッドホン": "ヘッドホン",
            "ヘッドフォン": "ヘッドホン",
            
            # Design variations
            "open-back": "Open-back",
            "openback": "Open-back",
            "Open-back": "Open-back",
            "open back": "Open-back",
            "オープンバック": "オープンバック",
            "オープン型": "オープンバック",
            
            # Reference variations
            "reference": "Reference",
            "Reference": "Reference",
            "ref": "Reference",
            "リファレンス": "リファレンス",
            "基準": "リファレンス",
            
            # Classic variations
            "classic": "Classic",
            "Classic": "Classic",
            "classical": "Classic",
            "クラシック": "クラシック",
            "古典": "クラシック",
            
            # Country variations
            "china": "China",
            "China": "China",
            "chinese": "China",
            "中国": "中国",
            "中華": "中国",
            "チャイナ": "中国",
            
            "germany": "Germany",
            "Germany": "Germany",
            "german": "Germany",
            "ドイツ": "ドイツ",
            "独": "ドイツ",
            
            "america": "America",
            "America": "America",
            "アメリカ": "アメリカ",
            "米国": "アメリカ",
            "USA": "USA",
            
            # Collaboration variations
            "collaboration": "Collaboration",
            "Collaboration": "Collaboration",
            "collab": "Collaboration",
            "コラボレーション": "コラボレーション",
            "コラボ": "コラボレーション",
            "共同開発": "コラボレーション",
            
            # Chi-Fi variations
            "chi-fi": "Chi-Fi",
            "Chi-Fi": "Chi-Fi",
            "chifi": "Chi-Fi",
            "ChiFi": "Chi-Fi",
            "Chinese HiFi": "Chi-Fi",
            
            # Monitor variations
            "monitor": "Monitor",
            "Monitor": "Monitor",
            "monitoring": "Monitor",
            "モニター": "モニター",
            "モニタ": "モニター",
            
            # Speaker variations
            "speaker": "Speaker",
            "Speaker": "Speaker",
            "speakers": "Speaker",
            "Speakers": "Speaker",
            "スピーカー": "スピーカー",
            "スピーカ": "スピーカー",
            
            # Studio variations
            "studio": "Studio",
            "Studio": "Studio",
            "スタジオ": "スタジオ",
            "録音室": "スタジオ",
            
            # Professional variations
            "professional": "Professional",
            "Professional": "Professional",
            "pro": "Professional",
            "Pro": "Professional",
            "プロフェッショナル": "プロフェッショナル",
            "プロ": "プロフェッショナル",
            
            # Digital variations
            "digital": "Digital",
            "Digital": "Digital",
            "デジタル": "デジタル",
            "ディジタル": "デジタル",
            
            # Analog variations
            "analog": "Analog",
            "Analog": "Analog",
            "analogue": "Analog",
            "Analogue": "Analog",
            "アナログ": "アナログ",
            
            # Portable variations
            "portable": "Portable",
            "Portable": "Portable",
            "ポータブル": "ポータブル",
            "携帯": "ポータブル",
        }
    
    def find_markdown_files(self) -> List[Path]:
        """Find all markdown files in _products and _companies directories"""
        md_files = []
        
        for directory in ["_products", "_companies"]:
            dir_path = self.root_dir / directory
            if dir_path.exists():
                md_files.extend(dir_path.rglob("*.md"))
        
        return md_files
    
    def extract_tags_from_file(self, file_path: Path) -> Tuple[List[str], int]:
        """Extract tags from a markdown file and return tags and line number"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                lines = f.readlines()
            
            in_frontmatter = False
            for i, line in enumerate(lines):
                stripped = line.strip()
                
                # Check for frontmatter start/end
                if stripped == "---":
                    in_frontmatter = not in_frontmatter
                    continue
                
                # Look for tags line in frontmatter
                if in_frontmatter and stripped.startswith("tags:"):
                    # Extract tags from the line
                    tags_match = re.search(r'tags:\s*\[(.*?)\]', stripped)
                    if tags_match:
                        tags_str = tags_match.group(1)
                        # Parse individual tags
                        tags = []
                        for tag in tags_str.split(','):
                            tag = tag.strip().strip('"').strip("'")
                            if tag:
                                tags.append(tag)
                        return tags, i + 1
            
            return [], -1
        
        except Exception as e:
            print(f"Error reading {file_path}: {e}")
            return [], -1
    
    def analyze_tags(self):
        """Analyze all tags to find variations"""
        md_files = self.find_markdown_files()
        
        print(f"Found {len(md_files)} markdown files")
        
        for file_path in md_files:
            tags, line_num = self.extract_tags_from_file(file_path)
            if tags:
                self.file_tags[str(file_path)] = {
                    'tags': tags,
                    'line_number': line_num
                }
                
                # Collect variations
                for tag in tags:
                    normalized = self.normalize_tag(tag)
                    self.tag_variations[normalized].add(tag)
    
    def normalize_tag(self, tag: str) -> str:
        """Normalize a tag using predefined rules"""
        # Check exact match first
        if tag in self.normalization_rules:
            return self.normalization_rules[tag]
        
        # Check case-insensitive match
        for rule_key, rule_value in self.normalization_rules.items():
            if tag.lower() == rule_key.lower():
                return rule_value
        
        # Return original if no rule matches
        return tag
    
    def find_variations(self) -> Dict[str, Set[str]]:
        """Find tags that have variations"""
        variations = {}
        
        for normalized_tag, variations_set in self.tag_variations.items():
            if len(variations_set) > 1:
                variations[normalized_tag] = variations_set
        
        return variations
    
    def show_analysis(self):
        """Show analysis results"""
        print("\n=== Tag Analysis ===")
        
        # Show all unique tags
        all_tags = set()
        for file_data in self.file_tags.values():
            all_tags.update(file_data['tags'])
        
        print(f"Total unique tags found: {len(all_tags)}")
        
        # Show variations
        variations = self.find_variations()
        if variations:
            print(f"\nFound {len(variations)} normalized tags with variations:")
            for normalized_tag, variations_set in variations.items():
                print(f"  {normalized_tag}: {list(variations_set)}")
        else:
            print("\nNo tag variations found!")
        
        # Show tag frequency
        tag_frequency = defaultdict(int)
        for file_data in self.file_tags.values():
            for tag in file_data['tags']:
                tag_frequency[tag] += 1
        
        print(f"\nTop 10 most common tags:")
        for tag, count in sorted(tag_frequency.items(), key=lambda x: x[1], reverse=True)[:10]:
            print(f"  {tag}: {count}")
    
    def fix_tags(self, dry_run: bool = True):
        """Fix tag variations in files"""
        if not self.file_tags:
            print("No files to process. Run analyze_tags() first.")
            return
        
        changes_made = 0
        
        for file_path, file_data in self.file_tags.items():
            original_tags = file_data['tags']
            line_number = file_data['line_number']
            
            # Normalize tags
            normalized_tags = [self.normalize_tag(tag) for tag in original_tags]
            
            # Check if any changes needed
            if original_tags != normalized_tags:
                if dry_run:
                    print(f"\nWould fix {file_path}:")
                    print(f"  Line {line_number}: {original_tags} -> {normalized_tags}")
                else:
                    # Read file
                    with open(file_path, 'r', encoding='utf-8') as f:
                        lines = f.readlines()
                    
                    # Replace tags line
                    if line_number <= len(lines):
                        old_line = lines[line_number - 1]
                        new_tags_str = ', '.join(f'"{tag}"' if ' ' in tag else tag for tag in normalized_tags)
                        new_line = re.sub(r'tags:\s*\[.*?\]', f'tags: [{new_tags_str}]', old_line)
                        lines[line_number - 1] = new_line
                        
                        # Write back
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.writelines(lines)
                        
                        print(f"Fixed {file_path}")
                        print(f"  Line {line_number}: {original_tags} -> {normalized_tags}")
                
                changes_made += 1
        
        if dry_run:
            print(f"\nDry run completed. {changes_made} files would be changed.")
            print("Use --apply to actually make changes.")
        else:
            print(f"\nCompleted! {changes_made} files were changed.")
    
    def export_tags(self, output_file: str = "tags_analysis.json"):
        """Export tag analysis to JSON file"""
        data = {
            'total_files': len(self.file_tags),
            'total_unique_tags': len(set(tag for file_data in self.file_tags.values() for tag in file_data['tags'])),
            'tag_variations': {k: list(v) for k, v in self.tag_variations.items()},
            'file_tags': self.file_tags,
            'normalization_rules': self.normalization_rules
        }
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        print(f"Analysis exported to {output_file}")


def main():
    parser = argparse.ArgumentParser(description='Normalize tags in markdown files')
    parser.add_argument('--root', default='.', help='Root directory (default: current directory)')
    parser.add_argument('--analyze', action='store_true', help='Analyze tags and show variations')
    parser.add_argument('--fix', action='store_true', help='Fix tag variations (dry run)')
    parser.add_argument('--apply', action='store_true', help='Apply fixes to files')
    parser.add_argument('--export', help='Export analysis to JSON file')
    
    args = parser.parse_args()
    
    normalizer = TagNormalizer(args.root)
    
    # Always analyze first
    normalizer.analyze_tags()
    
    if args.analyze:
        normalizer.show_analysis()
    
    if args.fix:
        normalizer.fix_tags(dry_run=True)
    
    if args.apply:
        normalizer.fix_tags(dry_run=False)
    
    if args.export:
        normalizer.export_tags(args.export)
    
    if not any([args.analyze, args.fix, args.apply, args.export]):
        # Default behavior: show analysis
        normalizer.show_analysis()


if __name__ == "__main__":
    main() 