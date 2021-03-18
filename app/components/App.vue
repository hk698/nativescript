<template>
   <Page> 
       <ActionBar title="Classes and Activities"/>
       
       
<StackLayout>
       <BottomNavigation height="400px">
        <TabStrip>
            <TabStripItem>
                <Label text="Home"></Label>
                <Image src="res://home"></Image>
            </TabStripItem>
            <TabStripItem>
                <Label text="Cart"></Label>
                <Image src="~/image/shopping-cart.png"></Image> 
            </TabStripItem>  
        </TabStrip>
        <TabContentItem>
           <LessonList :lessons="lessons" @addToCart="addToCart"/>
        </TabContentItem>
        <TabContentItem>
            <Checkout :cart="cart" @remove="remove" @emptyCart="emptyCart"/>
        </TabContentItem>
    </BottomNavigation>
</StackLayout>

   </Page>
</template>


<script>
import Checkout from './Checkout.vue';
import LessonList from './LessonList.vue';
export default {
  components: { LessonList, Checkout },
    data() {
	    return {
            lessons: [],
            cart:[],
	    };
    },
    methods:{
        accessLessons(){
            fetch('https://individialwork2.herokuapp.com/lessons') 
                .then(response => response.json()) 
                .then(data => this.lessons = data) 
                .catch(error => console.log(error));
        },
        addToCart(lesson){
            lesson.availableSpaces--;
            this.cart.push(lesson);
        },
        remove(lesson ,index){
            this.cart.splice(index, 1);  
            lesson.availableSpaces++;

        },
        emptyCart(){
            this.cart = [];
        }
    },
    mounted(){
        this.accessLessons();
    },
    computed:{
        noCartItems() {  
            return this.cart.length;
        },
    }
}
</script>

<style>
</style>