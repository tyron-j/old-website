# python file for updating compiler.bat for the less files



import os
import glob

def main():

	bat = open('compile.bat', 'w')
	os.chdir('C:/Users/Tyron/Documents/GitHub/website/styles/less')
	arr = []

	for f in glob.glob('*.less'):
		arr.append(f)

	text = ':: compiles all the less files to css files\n\ncd C:\Users\Tyron\Documents\GitHub\website\styles\n'

	for x in arr:
		text += '\ncall lessc -x less/' + x + " > compiled/" + x[:-5] + ".css"

	text += '\n\ncd C:\Users\Tyron\Documents\GitHub\website'

	bat.write(text)
	bat.close()

if __name__ == '__main__':
	main()