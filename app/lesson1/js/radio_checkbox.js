~function(){
    var btn = document.querySelector('#btn');
    
    btn.addEventListener('click', function() {
        var aCheckbox = document.querySelectorAll('input[type="checkbox"]');
        var inpList = [].slice.call(aCheckbox).filter(function(inp) {
            return inp.checked
        }).map(function(inp, i) {
            
            return inp.value
        })
        inpList.length ? alert(inpList.join(',')) : alert('没有勾选')
    })
    
}()