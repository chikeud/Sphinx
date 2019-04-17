<template>
  <div id="booking">
    <h1>Confirm Your Space today</h1>

    <form class="b-form" @submit.prevent="submit">

      <div>
        <div class="header">
          Select Size
          <div class="sub-header">feet</div>
          <div v-if="errors.size" class="sub-header" style="color:red;">required</div>
        </div>
        <div class="radios">
          <div v-for="s in sizes" class="radio">
            <label>
              <input type="radio" :id="'s_' + s" :value="s" v-model="size"/>
              <label :for="'s_' + s">{{s}}</label>
            </label>
          </div>
        </div>
      </div>

      <div>
        <div class="header">
          Pickup Date
          <div class="sub-header">December</div>
        </div>

        <div class="pickup">
          <div class="multi-select">
            <label for="pickup-day"></label>
            <select :class="{'error': errors.pickupDay && !pickupDay}" id="pickup-day" v-model="pickupDay">
              <option disabled value="">Pick a day</option>
              <option v-for="day in pickupDays" :value="day">{{day + "th"}}</option>
            </select>
          </div>

          <div class="multi-select">
            <label for="pickup-time"></label>
            <select :class="{'error': errors.pickupTime && !pickupTime}" id="pickup-time" :disabled="!pickupDay" v-model="pickupTime">
              <option disabled value="">Pick a time</option>
              <option v-for="time in pickupTimes" :value="time">{{time}}</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <div class="header">
          Delivery Date
          <div class="sub-header">January</div>
        </div>


        <div class="delivery">
          <div class="multi-select">
            <label for="delivery-day"></label>
            <select :class="{'error': errors.deliveryDay && !deliveryDay}" id="delivery-day" v-model="deliveryDay">
              <option disabled value="">Pick a day</option>
              <option v-for="day in deliveryDays" :value="day">{{day + "th"}}</option>
            </select>
          </div>

          <div class="multi-select">
            <label for="delivery-time"></label>
            <select :class="{'error': errors.deliveryTime && !deliveryTime}" id="delivery-time" :disabled="!deliveryDay" v-model="deliveryTime">
              <option disabled value="">Pick a time</option>
              <option v-for="time in deliveryTimes" :value="time">{{time}}</option>
            </select>
          </div>
        </div>
      </div>


      <div v-if="error" class="header error">{{error}}</div>
      <div v-if="success" class="header success">{{success}}</div>

      <button class="button">Book Now</button>
    </form>
  </div>
</template>

<script>

  let pickup = {};
  let delivery = {};
  let errors = {
    pickupDay: false
    , pickupTime: false
    , deliveryDay: false
    , deliveryTime: false
    , size: false
  };

  export default{
    data(){
      return {
        pickupDays: []
        , deliveryDays: []
        , pickupDay: ""
        , pickupTime: ""
        , deliveryDay: ""
        , deliveryTime: ""
        , sizes: ["5x5"]
        , size: ""
        , items: [{
          name: ""
          , description: ""
          , errors: {
            name: false
            , description: false
          }
        }]
        , errors
        , error: ""
        , success: ""
      }
    }
    , computed: {
      /**
       * Pickup times are computed based on
       * pickup day
       *
       * @returns {string[]}
       */
      pickupTimes(){
        let self = this;
        let pickups = pickup[self.pickupDay];

        if(pickups) return Object.keys(pickups).sort();
      }

      , loggedIn(){
        return this.$store.getters.loggedIn;
      }


      /**
       * Delivery Times are computed based on
       * delivery day
       *
       * @returns {string[]}
       */
      , deliveryTimes(){
        let self = this;
        let deliveries = delivery[self.deliveryDay];

        if(deliveries) return Object.keys(deliveries).sort();
      }
    }
    , methods: {
      /**
       * compare func for sort
       *
       * @param a an element
       * @param b another element
       *
       * @returns {number}
       */
      compare(a, b){
        return a - b;
      }

      /**
       * Validates the form before
       * submission
       *
       * @returns {boolean}
       */
      , validate(){
        let self = this;
        let keys = Object.keys(self.errors);
        let validated = true;

        for(let key of keys){
          if(!self[key]){
            self.errors[key] = true;

            if(validated) validated = false;
          }
          else if(self.errors[key]){
            self.errors[key] = false;
          }
        }

        return validated;
      }

      /**
       * Handles form submission
       *
       * @returns {Promise.<void>}
       */
      , async submit(){
        let self = this;
        let booking = {};
        let pickupDay = self.pickupDay;
        let deliveryDay = self.deliveryDay;
        let pickupTime = self.pickupTime;
        let deliveryTime = self.deliveryTime;

        if (!self.validate()) return;

        booking.size = self.size;
        booking.pickup = pickup[pickupDay][pickupTime];
        booking.delivery = delivery[deliveryDay][deliveryTime];
        booking.items = [];

        for(let item of self.items){
          if(item.name){
            booking.items.push(item);
          }
        }

        try{
          let bookingRoute = '/api/b/new';
          let res = await self.$http.post(bookingRoute, booking);

          self.error = "";
          self.success = res.body.message;
        }
        catch(err){
          self.success = "";
          self.error = err.body.error.message;
        }
      }


      /**
       * Sets the pickup/delivery
       * dates and times
       */
      , setTimes(){
        let self = this;
        let pickups = {};
        let deliveries = {};

        self.pickupDays = self.parseTimes(pickup, pickups);
        self.deliveryDays = self.parseTimes(delivery, deliveries);

        pickup = pickups;
        delivery = deliveries;
      }

      /**
       * Parses a list objects of date + time strings
       * into an object
       *
       * date format: day-hr:mins e.g. 10-13:30
       *
       * @param dates a list of date objects from db
       * @param result
       * @returns {Array.<*>|Array}
       */
      , parseTimes(dates, result){
        let self = this;
        let days = [];

        for(let obj of dates){
          let date = obj.date.split("-");
          let day = date[0];
          let time = date[1];

          if(result[day] === undefined){
            result[day] = {};
            days.push(day);
          }

          result[day][time] = obj._id;
        }

        return days.sort(self.compare);
      }

      /**
       * Gets a list of available dates from
       * the api and sets them up for parsing
       *
       * @returns {Promise.<void>}
       */
      , async getTimes(){
        let self = this;

        try{
          let datesRoute = '/api/b/dates';
          let res = await self.$http.get(datesRoute);
          let {pickup: pickups, delivery: deliveries} = res.body.result;

          pickup = pickups;
          delivery = deliveries;
          self.setTimes();
        }
        catch(err){
          console.log(err);
        }
      }
    }
    , async mounted(){
      let self = this;

      try{
        await self.getTimes();
      }
      catch(err){
        console.log(err);
      }

    }
  }
</script>

<style>
  #booking{
    position: relative;
    font-size: 0.17em;
    display: flex;
    flex-direction: column;
    font-family: Nunito, Quicksand, sans-serif;
    color: #396F89;
  }

  #booking h1{
    text-align: center;
    font-size: 0.7em;
    margin: 50px;
  }

  .b-form{
    display: flex;
    flex-direction: column;
    max-width: 700px;
    min-width: 700px;
    margin: auto;
  }

  .b-form .header{
    font-size: 0.6em;
    text-align: center;
    margin: 10px;
  }

  .b-form .sub-header{
    font-size: 0.7em;
    text-align: center;
    margin: 10px;
  }

  .b-form .radios
  , .b-form .pickup
  , .b-form .delivery {
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
  }

  .b-form .radio{
    margin-right: 40px;
  }

  .b-form .radio:last-child{
    margin-right: 0;
  }

  .b-form input[type="radio"]{
    display: none;
  }

  .b-form input[type="radio"] + label{
    background-color: #4992B7;
    color: white;
    display: flex;
    width: 70px;
    height: 70px;
    align-items: center;
    justify-content: center;
    font-size: 0.5em;
    border-radius: 4px;
    transition: all 0.2s linear;
  }

  .b-form input[type="radio"] + label:hover{
    cursor: pointer;
    background-color: #417D9A;
    color: lightblue;
  }

  .b-form input[type="radio"]:checked + label{
    background-color: #8CAFC0;
  }

  select, input{
    -webkit-appearance: none;
    -moz-appearance: none;
    border-radius: 0;
    border: 2px solid #4992B7;
    text-indent: 5px;
    color: #396F89;
    transition: all 0.2s linear;
    text-align: left;
  }

  select:hover{
    cursor: pointer;
  }

  select:disabled{
    opacity: 0.5;
  }

  .b-form .pickup, .b-form .delivery,  .b-form .item{
    justify-content: space-evenly;
  }

  .b-form .items{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .b-form .item{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  .b-form button{
    width: 100px;
    height: 35px;
    color: #35667F;
    background: white;
    font-size: 0.5em;
    border: 2px solid #4992B7;
    margin: 20px auto;
  }

  .b-form button:hover{
    color: white;
    background: #4992B7;
  }

  .b-form input{
    text-indent: 5px;
  }

  .b-form input::placeholder{
    color: #396F89;
    opacity: 1;
  }

  .b-form .multi-select select, .b-form .items input{
    width: 300px;
    height: 35px;
    background: white;
    font-size: 0.5em;
  }

  .b-form .error{
    color: red !important;
  }

  .b-form .in-error::placeholder{
    color: red !important;
  }

  .b-form .success{
    color: green;
  }
</style>
