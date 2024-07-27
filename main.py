from docx import Document


def main():
    re_doc = Document('Assets/PH Tenancy Agreement.docx')

    name = input('Name: ')
    price = input('Price: ')
    entry_date = input('Entry Date: ')
    stay_period = input('Stay Period: ')

    replacement = {
        '{{name}}': name,
        '{{price}}': price,
        '{{entry_date}}': entry_date,
        '{{stay period}}': stay_period,
    }

    for paragraph in re_doc.paragraphs:
        for key, value in replacement.items():
            if key in paragraph.text:
                paragraph.text = paragraph.text.replace(key, value)

    re_doc.save('Assets/Tenancy Agreement.docx')


if __name__ == "__main__":
    main()
