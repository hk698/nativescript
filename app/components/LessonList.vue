<template>
  <ScrollView orientation="vertical">
    <StackLayout class="lessons">
      <StackLayout style="margin-bottom : 30" v-for="(lesson, key) in lessons" :key="key">
        <StackLayout class="lessonImage" :style="{'background-image': 'url(\'~/' + lesson.image +'\')'}"> </StackLayout> 
          <Label class="subject" :text="lesson.subject" textWrap="true" />
          <Label class="location" :text="lesson.location" textWrap="true" />
          <Label class="price" :text="'Price: ' + lesson.price" textWrap="true" />
          <Label class="spaces" :text="'Available Spaces: ' + lesson.availableSpaces" textWrap="true" />
          <Button class="btn" text="Add to Cart" @tap="$emit('addToCart', lesson)" :isEnabled="!(lesson.availableSpaces <= 0)"/>
       </StackLayout>
    </StackLayout>
  </ScrollView>
</template>

<script>
export default {
  props: ["lessons"],
  data() {
    return {};
  },
};
</script>

<style>
.lessons{
    padding: 30;
}
.lessonImage{
    width: 100%;
    height: 300;
    padding-top: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-color: aliceblue;
}
.subject{
    font-size: 22;
    font-weight: bold;
}

.location{
    font-size: 16;
}
.price{
    font-size: 16;
}
.spaces{
    font-size:16;
}
.btn{
    background-color: aquamarine;
    color: black;
    height: 50;
    width: 100%;

}
</style>