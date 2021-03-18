<template>
    <ScrollView orientation="vertical">
        <StackLayout>
            <StackLayout class="cart" v-show="showCartPage && showMessage">
                    <Button class="checkoutbtn" text="Checkout" @tap="showCartPage = false && showMessage " :visibility="cart.length > 0 ? 'visible' : 'collapsed'" >CHECKOUT</Button>

                    <StackLayout class="items">
                        <Label textWrap="true" :visibility="cart.length > 0 ? 'visible' : 'collapsed'" >Cart Items: {{this.cart.length}}</Label>
                        <Label textWrap="true" :visibility="cart.length > 0 ? 'visible' : 'collapsed'" >Total Price: {{getTotal}}</Label>
                        <Label class="empty" textWrap="true" :visibility="cart.length <= 0 ? 'visible' : 'collapsed'">Your Cart is Empty</Label>  
                    </StackLayout>

                    <StackLayout style="margin-bottom : 30" v-for="(lesson, index) in cart" :key="index">
                        <Label class="subject" :text="lesson.subject" textWrap="true" ></Label>
                        <Button class="RemoveBtn" text="Remove" @tap="$emit('remove', lesson, index)"/>
                    </StackLayout>
                    
            </StackLayout>

            <StackLayout class="cart2" orientation="vertical"  v-show="!showCartPage && showMessage" >
                <Label class="details" text="Please enter your full name and phone number" textWrap="true" />
                
                <TextField class="text" hint="Name" color="black" backgroundColor="white" v-model="checkout.name" />
                <TextField class="text" hint="Number" color="black" backgroundColor="white" v-model="checkout.number" />
                <Button class="complete" text="Complete Order" :isEnabled="validCheckout" @tap="finishCheckout"/>
                <Button class="back" text="Go Back" @tap="showCartPage = true"/>

            </StackLayout>
            <StackLayout v-show="!showCartPage && !showMessage">
              <Label class="thanks" text="Thanks for your Order" textWrap="true" />
              <Button class= "close" text="Close" @tap="showCartPage = true; showMessage = true" />
              
            </StackLayout>
        </StackLayout>  
    </ScrollView>
</template>

<script>
export default {
    props: ['cart'],
    data() { 
	    return {
            checkout: {
            name: '',
            number: ''
        },
             showMessage : true,
	         showCartPage : true
        };
    },
    methods:{
        finishCheckout(){
            this.showMessage = false;
            this.cart.forEach(item => {

                let body = {                            
                    "name": this.checkout.name,
                    "phone": this.checkout.number,
                    "lessonID": item._id
                };
                this.newOrder(body); 
                this.updateAvailableSpaces(item); 

            });

           this.$emit('emptyCart');
        },
        newOrder(order) {

            fetch('https://individialwork2.herokuapp.com/order', {
                method: 'POST', 
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order) 
            }).catch(error => console.log(error));

        },
        updateAvailableSpaces(item) {

            fetch(`https://individialwork2.herokuapp.com/update/${item._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    availableSpaces: item.availableSpaces
                })
            }).catch(error => console.log(error));

        },
        test(){
            alert("succes");
        }
    },
    computed:{
        getTotal(){
            var total = 0;
            this.cart.forEach(item => {
                total += item.price
            });
            return total;
        },
        validCheckout(){
            let testName = /^[a-zA-Z\s]*$/.test(this.checkout.name);
            let testNumber = /^\d+$/.test(this.checkout.number);

            if (testName && this.checkout.name.length > 0 && testNumber){
                return true;
            }
            return false;
        }    
    }
}
</script>

<style>
.cart{
    padding: 30;
}
.cart2{
    margin-top: 200;
    align-content: center;
    padding: 30;
}
.text{
    margin-bottom: 10;
    height: 50;
    color:black;
    font-size: 20;
}
.subject{
    font-size: 22;
    font-weight: bold;
}
.RemoveBtn{
    background-color: red;
    color: white;
    height: 50;
    width: 100%;

}
.checkoutbtn{
    margin-right: 10;
    padding: 30 ;
    font-size: 25;
    font-weight: bold;
    color: black;
    background-color: aquamarine;
    height: 50;
    width: 50%;
   
    }
.items{
    padding: 30 ;
    font-size: 25;
    color: white;
}
.empty{
    text-align: center;
    padding-top: 200;
    font-size: 30;
    font-weight: bold;
}
.complete{
    font-size: 25;
    color: black;
    background-color: aquamarine;
    height: 50;
    width: 79%;
    }
.back{
    background-color: red;
    color: white;
    height: 50;
    width: 50%;
}
.thanks{
    text-align: center;
    padding: 30;
    margin-top: 200;
    font-size: 50; 
    font-weight: bold;
}
.close{
     background-color: red;
    color: white;
    height: 50;
    width: 30%;
}
.details{
    font-size: 30;
    text-align: center;
    padding-bottom: 10;
    font-weight: bold;
    margin-top: 0;
}

</style>