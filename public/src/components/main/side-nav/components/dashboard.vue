<template>
  <div class="md-layout md-gutter">
    <div class="md-layout-item md-layout md-size-70 md-gutter">

      <div class="md-layout-item md-size-100">
        <md-content class="md-elevation-3">
            <!-- <img src="/assets/examples/avatar.png" alt="Avatar"> -->
          <img src="https://placehold.it/60x60" alt="welcome">
          <div class="welcome-text">
            <h3 class="md-body-2">
              Welcome to Stor!
            </h3>
            <span class="md-caption">
              This is your account dashboard where you can stay up to date with everything relating to your account
            </span>

          </div>
        </md-content>
      </div>

      <div class="md-layout-item md-size-50">
        <md-card>
          <md-card-media>
            <img src="https://placehold.it/300x250" alt="People">
          </md-card-media>

          <md-card-header>
            <div class="md-title">Renters Guide</div>
            <!-- <div class="md-subhead">Subtitle here</div> -->
          </md-card-header>

          <md-card-content>
            Get started renting with Stor with this helpful video.
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item md-size-50">
        <md-card>
          <md-card-media>
            <img src="https://placehold.it/300x250" alt="People">
          </md-card-media>

          <md-card-header>
            <div class="md-title">Host Guide</div>
            <!-- <div class="md-subhead">Subtitle here</div> -->
          </md-card-header>

          <md-card-content>
            Get started hosting with Stor with this helpful video
          </md-card-content>
        </md-card>
      </div>

      <div class="md-layout-item md-size-100">
        <md-content class="timeline md-elevation-3">
          Timeline
        </md-content>
      </div>

      <div class="md-layout-item md-siz-33">
        <md-content class="view-host md-elevation-3">
          View Host
        </md-content>
      </div>
      <div class="md-layout-item md-size-33">
        <md-content class="faqs md-elevation-3">
          FAQs
        </md-content>
      </div>
      <div class="md-layout-item md-size-33">
        <md-content class="payment md-elevation-3">
          Payment
        </md-content>
      </div>

    </div>
    <div class="md-layout-item md-layout md-size-30 md-gutter">
      <div class="md-layout-item md-size-100">
        <md-content class="started md-elevation-3">
          <h3>Get Started</h3>
          <p>Let's get you familiarize with your Stor account with a simple tutorial</p>
          <md-button class="md-primary md-raised lets-go">LETS GO</md-button>
        </md-content>
      </div>
      <div class="md-layout-item md-size-50">
        <md-content class="verification md-elevation-3">
          Verification
        </md-content>
      </div>
      <div class="md-layout-item md-size-50">
        <md-content class="profile md-elevation-3">
          Profile
        </md-content>
      </div>
      <div class="md-layout-item md-size-100">
        <md-content class="notification md-elevation-3">
          <!-- <p>Notifications</p> -->
          <md-list class="md-triple-line">
            <md-subheader>Notification</md-subheader>
            <md-divider></md-divider>
            <md-list-item>
              <md-avatar>
                <img src="https://placeimg.com/40/40/people/1" alt="People">
              </md-avatar>

              <div class="md-list-item-text">
                <span>Ali Connors</span>
                <span>Brunch this weekend?</span>
                <p>I'll be in your neighborhood doing errands this week. Do you want to meet?</p>
              </div>

              <md-button class="md-icon-button md-list-action">
                <md-icon class="md-primary">star</md-icon>
              </md-button>
            </md-list-item>
            <md-divider class="md-inset"></md-divider>
            <md-list-item>
              <md-avatar>
                <img src="https://placeimg.com/40/40/people/1" alt="People">
              </md-avatar>

              <div class="md-list-item-text">
                <span>Ali Connors</span>
                <span>Brunch this weekend?</span>
                <p>I'll be in your neighborhood doing errands this week. Do you want to meet?</p>
              </div>

              <md-button class="md-icon-button md-list-action">
                <md-icon class="md-primary">star</md-icon>
              </md-button>
            </md-list-item>
          </md-list>
        </md-content>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { MdButton, MdCard, MdContent, MdAvatar, MdList, MdIcon, MdSubheader, MdDivider } from 'vue-material/dist/components';
  import 'vue-material/dist/vue-material.min.css';

  Vue.use(MdButton);
  Vue.use(MdCard);
  Vue.use(MdContent);
  Vue.use(MdAvatar);
  Vue.use(MdList);
  Vue.use(MdIcon);
  Vue.use(MdSubheader);
  Vue.use(MdDivider);


  export default {
    data(){
      return {
        msg: "Dashboard"
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../../../node_modules/vue-material/dist/theme/engine";
  // @import "~vue-material/dist/theme/engine"; // Import the theme engine

  @include md-register-theme("default", (
    primary: #059de6, // The primary color of your application
    accent: #9bc765 // The accent or secondary color
  ));

  @import "../../../../../node_modules/vue-material/dist/theme/all"; // Apply the theme
  .md-layout-item {
    margin-top: 12px;
    margin-bottom: 12px;
    // height: 100vh;

    // &:after {
    //   width: 100%;
    //   height: 100%;
    //   display: block;
    //   // background: md-get-palette-color(black, 200);
    //   content: " ";
    // }

    .md-card {
      width: 100%;
      // margin: 4px;
      display: inline-block;
      vertical-align: top;

    }
    .md-content {
      width: 100%;
      // height: 80px;
      display: inline-flex;
      padding: 20px;

      &.timeline {
        height: 250px;
      }

      &.view-host, &.faqs, &.payment, &.verification, &.profile {
        height: 100px;
      }

      &.started {
        display: block;

        .md-button {
          margin: none;
        }
      }

      &.notification {
        height: 100%;
      }

      img {
        width: 60px;
        height: 60px;
      }

      .welcome-text {
        margin-left: 14px;
      }

      span {
        display: block;
        margin: .6em;
      }

      img {
        width: 100px;
        display: block;
      }

      .md-list {
        // width: 320px;
        max-width: 100%;
        display: inline-block;
        vertical-align: top;
      }

      .md-button.lets-go {
        margin-left: 0;
        color: white !important;
      }
    }
  }

</style>
