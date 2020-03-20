/*具体来说，我们希望你：

编写一个循环，它将从0迭代到people数组的长度。 你需要从一个初始化器var i = 0开始，但是你需要什么退出条件？
在每个循环迭代期间，使用条件语句检查当前数组项是否等于“Phil”或“Lola”：
如果是，则将数组项连接到拒绝段落的textContent的末尾，后跟逗号和空格。
如果不是，则将数组项连接到接收段落的textContent的末尾，后跟逗号和空格。
我们已经提供给您：

var i = 0; — 你的初始化程序
refused.textContent += - 将连接某些东西的行的开头，结束于refused.textContent。
admitted.textContent += - 将连接某些内容到一行的结尾的行的开始。
额外的奖金问题 - 成功完成上述任务后，您将留下两个名称列表，用逗号分隔，但它们将不整齐 - 每个结尾处都会有一个逗号。 你可以制定出如何在每种情况下编写最后一个逗号的行，并添加一个完整的停止？ 看看有用的字符串方法文章的帮助。
*/
var people = ['Chris', 'Anne', 'Colin', 'Terri', 'Phil', 'Lola', 'Sam', 'Kay', 'Bruce'];

var admitted = document.querySelector('.admitted');
var refused = document.querySelector('.refused');
admitted.textContent = 'Admit: ';
refused.textContent = 'Refuse: '

let i = 0;
while (i < people.length) {
    if (people[i] === 'Phil' || people[i] === 'Lola') {
        refused.textContent += people[i] + ', ';
    } else {
        admitted.textContent += people[i] + ', ';
    }
    i++;
}
refused.textContent = refused.textContent.slice(0, refused.textContent.length - 2) + '.';
admitted.textContent = admitted.textContent.slice(0, admitted.textContent.length - 2) + '.';