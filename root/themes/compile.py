# python file for updating compiler.bat for the less files



import json
import os
import glob

def main():

	config = open('../config.json')
	theme = json.loads(config.read())['theme']

	config.close()

	bat = open('hellogoodbye.bat', 'w')
	arr = []

	os.chdir('C:/Users/Tyron/Documents/GitHub/website/root/themes/' + theme)

	for f in glob.glob('*.less'):
		arr.append(f)

	text = ':: compiles all the less files to css files\n'

	for x in arr:
		text += '\ncall lessc -x ' + theme + '/' + x + " > current/" + x[:-5] + ".css"

	bat.write(text)
	bat.close()

if __name__ == '__main__':
	main()