<template>
  <div id="overall">
    <div id="stor">
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

      <div class="md-layout-item md-size-100">
        <md-content class="timeline md-elevation-3">
          Timeline
        </md-content>
      </div>
    </div>
  </div>
</template>

<script>
  export default {}
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
    .md-triple-line{

      width: 100%;
      padding: 5px;
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
          margin: 0px;
        }
      }

      &.notification {
        height: 30%;

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

  .blah{
    text-align: center;
  }
  #stor{
    display:flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }
</style>
