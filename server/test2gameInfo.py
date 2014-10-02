from json import load, dump

BPs = load(open('test.json'))


def get_check_point(number, author):
    check_point = {
        "imagesPath": "./image/%s/" % number,
        "author": author
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
        }
    ]
}

for bp in BPs:
    cp = get_check_point(bp['number'], bp['author'])
    tpl['checkPointTypes'][0]['checkPoints'].append(cp)

dump(tpl, open('/Users/zhangbin/workspace/bongard/src/client/www/js/data/'
               'gameInfo.json', 'w'))
