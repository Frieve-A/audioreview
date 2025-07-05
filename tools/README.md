# Audio Review Validation Tools

This directory contains tools for checking the quality of audio review files.

## Tool List

### review_validator.py
Python script to check review file consistency and policy compliance

**Main Features:**
- Consistency check between overall score and sum of individual evaluation criteria
- Compliance check with requirements specified in dev/review_policy.md
- Verification of required fields and sections
- Generation of detailed validation reports

**Usage:**
```bash
cd tools
python3 review_validator.py
```

**Output:**
- Display validation results in console
- Save report to `review_validation_report.md`

**Validation Items:**
1. **Score Consistency**: Check if the first value in rating array (overall score) matches the sum of the remaining 5 values
2. **Required Fields**: layout, title, target_name, company_id, lang, ref, date, rating, summary, tags, permalink
3. **Required Sections**: Overview, Scientific Validity, Technology Level, Cost-Performance, Reliability & Support, Rationality of Design Philosophy, Advice
4. **Format**: Date format, permalink format, file placement validity

## Usage Examples

```bash
# Navigate to tools directory
cd tools

# Run validation
python3 review_validator.py

# Check results
cat review_validation_report.md
```

## Notes

- The script searches for review files based on the parent directory (project root)
- English version review files do not use Japanese section names, so section missing errors may occur
- Validation results are saved to `review_validation_report.md` 