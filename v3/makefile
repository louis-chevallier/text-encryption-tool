URL?=https://nrm.wikipedia.org/wiki/Rome
URL?=https://www.onlinetexteditor.com/


start : xx

xx :
	node --experimental-network-imports --experimental-modules safe.js
#	firefox -new-instance -P debug -devtools ./test.html
#-jsconsole

run :
	web-ext run --devtools  --start-url $(URL)

# https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/
install :
	npm install --global web-ext
