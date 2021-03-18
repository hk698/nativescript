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


</style>