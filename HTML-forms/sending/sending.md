发送文件：

enctype属性：
该属性允许您指定在提交表单时所生成的请求中的Content-Type的HTTP数据头的值。这个数据头非常重要，因为它告诉服务器正在发送什么样的数据。默认情况下，它的值是application/x-www-form-urlencoded。它的意思是：“这是已编码为URL参数的表单数据。”

如果你想要发送文件，你需要额外的三个步骤：

将method属性设置为POST，因为文件内容不能放入URL参数中。
将enctype的值设置为multipart/form-data，因为数据将被分成多个部分，每个文件单独占用一个部分，表单正文中包含的文本数据（如果文本也输入到表单中）占用一个部分。
包含一个或多个File picker小部件，允许用户选择将要上传的文件。