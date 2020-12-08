function buy(elementId) {
    var product = '',productPrice = "",itemId = "";
    var currentOption, priceModifier = 0.0;

    var cartItem = document.createElement("tr");
    cartItem.classList.add("cart-item");
    var id = document.createAttribute('id');
    var td = document.createElement('td');
    var tdPrice = document.createElement('td');
    tdPrice.classList.add('price');
    var itemAmount = document.getElementById('item-amount-'+elementId).value;
    var colorId = document.getElementById('item-Color-'+elementId).value;
    var capacityId = document.getElementById('item-Capacity-'+elementId).value;

    $.getJSON('products.json', function(data){
       for(i in data){
            if(data[i].id == elementId){
                product += data[i].name+" ";
                itemId += data[i].id;
                var options = data[i].options;
                for (y in options) {
                    if (options[y].name == "Color") {
                        currentOption = colorId;
                    }
                    if (options[y].name == "Capacity") {
                        currentOption = capacityId;
                    }
                    var values = options[y].values;
                    for(z in values) {
                        if (values[z].id == currentOption) {
                            product += values[z].name+" ";
                            itemId += values[z].id;
                            if (values[z].priceModifier > 0) {
                                priceModifier += values[z].priceModifier;
                            }
                        }
                    }
                }
                productPrice += (data[i].price+priceModifier);
            }
        }
        td.innerHTML = product;
        tdPrice.innerHTML = productPrice + "$";
        
        id.value = itemId;
        cartItem.attributes.setNamedItem(id);
        var amountInput = document.createElement("td");
        amountInput.innerHTML = "<input id='amount"+itemId+"' class='amount' type='number' value='"+(itemAmount)+"'>";

        var deleteButton = document.createElement("button");
        var attr = document.createAttribute('onclick');
        attr.value = "deleteItem(this.parentNode);";
        deleteButton.innerHTML = "X";
        deleteButton.classList.add('x-button');
        deleteButton.attributes.setNamedItem(attr);
        var td1 = document.createElement('td');
        td1.appendChild(deleteButton);
    

        var empty = document.getElementById("cart-empty");
        if (!empty.classList.contains('none')) {
            empty.classList.toggle('none');
        }

        cartItem.appendChild(td); 
        cartItem.appendChild(amountInput);
        cartItem.appendChild(tdPrice);  
        cartItem.appendChild(td1);
    
        var cart = document.getElementById('shopping-items');
        var items = document.getElementById(itemId);
        if (items == null) {
            cart.insertBefore(cartItem,empty);
        }else{
            var amount = document.getElementById('amount'+itemId);
            amount.value = parseInt(amount.value) + parseInt(itemAmount); 
        }
    }); 
    checkCart();
}
function deleteItem(id) {
    id.parentNode.remove();
    var items = document.getElementsByClassName('cart-item');
    var empty = document.getElementById("cart-empty");
    if (items.length < 1) {
        empty.classList.toggle('none');
    }
    checkCart();
}
function changePhoto(element, elementId) {
    if (element.classList.contains('Color')) {
        var photo = "";
        $.getJSON('products.json', function(data){
            var currentOption = element.value;
            for(i in data){
                 if(data[i].id == elementId){
                    var values = data[i].options[0].values;
                    for(z in values) {
                        if (values[z].id == currentOption) {
                            photo = values[z].photoSrc;
                            if(values[z].priceModifier > 0){
                                document.getElementById('price-Color-'+elementId).innerHTML = "+ "+values[z].priceModifier+"$";
                                document.getElementById('price-Color-'+elementId).classList.toggle('none');
                            }else if(!document.getElementById('price-Color-'+elementId).classList.contains('none')){
                                document.getElementById('price-Color-'+elementId).classList.toggle('none');
                            }
                        }
                    }
                document.getElementById('item-img-'+elementId).src = "images/"+photo;
                }   
            }
        }); 
    }else{
        $.getJSON('products.json', function(data){
            var currentOption = element.value;
            for(i in data){
                 if(data[i].id == elementId){
                    var values = data[i].options[1].values;
                    for(z in values) {
                        if (values[z].id == currentOption) {
                            if(values[z].priceModifier > 0){
                                document.getElementById('price-Capacity-'+elementId).innerHTML = "+ "+values[z].priceModifier+"$";
                                document.getElementById('price-Capacity-'+elementId).classList.toggle('none');
                            }else if(!document.getElementById('price-Capacity-'+elementId).classList.contains('none')){
                                document.getElementById('price-Capacity-'+elementId).classList.toggle('none');
                            }
                        }
                    }
                }   
            }
        });
    }
}
