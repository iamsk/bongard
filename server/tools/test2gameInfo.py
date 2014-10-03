from json import load, dump

BPs = load(open('test.json'))

AUTHORS = {
    'bongard': 'Mikhail M. Bongard',
    'merse': 'Merse E. Gáspár',
    'barenbaum': 'Pablo Barenbaum',
    'ihde': 'Michael Ihde',
    'gunnarsson': 'Andreas Gunnarsson',
    'foundal': 'Harry E. Foundalis',
    'insana': 'Joseph A. L. Insana',
    'shanahan': 'Peter Shanahan',
    'howells': 'Matthew J. Howells',
    'doughof': 'Douglas R. Hofstadter',
}


def get_check_point(number, author):
    check_point = {
        "imagesPath": "./image/%s/" % number,
        "author": AUTHORS[author]
    }
    return check_point


tpl = {
    "version": "0.1.0",
    "checkPointTypes": [
        {
            "name": "simple",
            "checkPoints": []
        }, {
            "name": "medium",
            "checkPoints": []
        }, {
            "name": "senior",
            "checkPoints": []
        }, {
            "name": "complex",
            "checkPoints": []
        }
    ]
}

for bp in BPs:
    if not bp['number'].isdigit():
        continue
    cp = get_check_point(bp['number'], bp['author'])
    tpl['checkPointTypes'][0]['checkPoints'].append(cp)

dump(tpl, open('/Users/zhangbin/workspace/bongard/src/client/www/js/data/'
               'gameInfo.json', 'w'))
