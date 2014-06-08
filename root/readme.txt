To start the Apache server:

- Go to "C:\Program Files (x86)\Apache Software Foundation\Apache2.2\bin"
- Open "httpd.exe" (create a batch file for this later)



To change the document root of the Apache server:

- Go to "C:\Program Files (x86)\Apache Software Foundation\Apache2.2\conf"
- Open "httpd.conf" (remember to open text editor as administrator)
- Change the DocumentRoot parameter (ctrl-f "DocumentRoot"; original was "C:/Program Files (x86)/Apache Software Foundation/Apache2.2/htdocs")
- Change the Directory tag (ctrl-f "# This should be changed to whatever you set DocumentRoot to.") to be the same as DocumentRoot
- Finally, change the DirectoryIndex (ctrl-f "DirectoryIndex") accordingly