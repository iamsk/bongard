import csv
from json import load


def tocsv():
    BPs = load(open('test.json'))

    writer = csv.writer(file('your.csv', 'wb'))
    writer.writerow(['Number', 'Image'])
    for bp in BPs:
        if not bp['number'].isdigit():
            continue
        writer.writerow([bp['number'], bp['image_urls'][0]])

if __name__ == '__main__':
    tocsv()
