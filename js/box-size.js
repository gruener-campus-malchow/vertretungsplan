var allBoxes = [];
var kastenBoxes = [];

$(document).ready(function ()
{
    test();
});

function test()
{
    allBoxes = document.getElementsByClassName("kasten");
    
    
    allBoxes.from(parent.children).forEach(function (element) {
        console.log(element);
        alert(element);

        //if (value == "kasten")
        //{
        //    alert(value);
        //    //allBoxes.pop(key);
        //}
    });

    //console.log(allBoxes);
}