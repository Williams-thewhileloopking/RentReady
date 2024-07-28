from docx import Document


def replace_text_preserve_format(doc_path, replacements, output_path):
    doc = Document(doc_path)

    for paragraph in doc.paragraphs:
        for key, value in replacements.items():
            if key in paragraph.text:
                new_runs = []
                for run in paragraph.runs:
                    if key in run.text:
                        parts = run.text.split(key)
                        if parts[:-1]:
                            new_run = run._element
                            new_run.text = parts[:-1]
                            new_runs.append(new_run)
                        new_run = run._element
                        new_run.text = value
                        new_runs.append(new_run)
                        if parts[-1]:
                            new_run = run._element
                            new_run.text = parts[-1]
                            new_runs.append(new_run)
                    else:
                        new_runs.append(run._element)
                # Clear the paragraph's runs and add the new runs
                paragraph.clear()
                for run in new_runs:
                    paragraph._element.append(run)

    doc.save(output_path)


def main():
    doc_path = 'Assets/Tenancy Agreement(GPT).docx'
    output_path = 'Assets/Tenancy Agreement.docx'

    name = input('Name: ')
    rent = input('Rent: ')
    entry_date = input('Entry Date: ')
    stay_period = input('Stay Period: ')
    email = input('Email: ')

    replacements = {
        '{{rent}}': rent,
        '{{name}}': name,
        '{{entry_date}}': entry_date,
        '{{stay_period}}': stay_period,
        '{{total_rent}}': f"{int(rent) * 12}",
        '{{email}}': email
    }

    replace_text_preserve_format(doc_path, replacements, output_path)


if __name__ == "__main__":
    main()
