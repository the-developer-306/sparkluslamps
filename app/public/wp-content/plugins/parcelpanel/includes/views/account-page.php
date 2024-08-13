<?php

/**
 * @author Chuwen
 * @date   2021/7/26 16:37
 */

defined('ABSPATH') || exit;
?>
<style>
  .components-modal__content:before {
    margin: 0
  }
</style>
<template id="pp-app">
  <div id="pp-account" class="pp-wrap">
    <modal :open="isOpenModal" title="<?php esc_html_e('Downgrade to Starter Free plan', 'parcelpanel') ?>" cancel="Cancel" confirm="Downgrade" ok-type="destructive" @cancel="isOpenModal=false" @ok="freeOk">
      <p><?php esc_html_e('This can\'t be undone!', 'parcelpanel') ?></p>
    </modal>

    <modal :open="isOpenRatingModal" title="<?php esc_html_e('Free upgrade completed. Congratulations!! 🎉', 'parcelpanel') ?>" confirm="" cancel="" @cancel="isOpenRatingModal=false">
      <div class="free-upgrade-completed__body">
        <p><?php esc_html_e('Would you mind letting us know what you think about ParcelPanel', 'parcelpanel') ?></p>
        <div class="pp-rate">
          <i v-for="i of 5" :key="i" @click="onRatingClick(6-i)"></i>
        </div>
      </div>
      <template slot="footer">
        <pp-button variant="secondary" @click="onNeedAnyHelpClick"><?php esc_html_e('Need any help?', 'parcelpanel') ?></pp-button>
      </template>
    </modal>

    <modal :open="isOpenFeedbackModal" title="<?php esc_html_e('Send your feedback', 'parcelpanel') ?>" confirm="" cancel="" @cancel="isOpenFeedbackModal=false">
      <p style="margin:0 0 4px"><?php esc_html_e('Please tell us more, we will try the best to get better', 'parcelpanel') ?></p>
      <textarea id="pp-modal-feedback__msg" v-model="fbMsg" placeholder="<?php esc_html_e('Edit your message here...', 'parcelpanel') ?>" style="display:block;width:100%;border-radius:2px" rows=6></textarea>
      <p style="margin:8px 0 4px"><?php esc_html_e('Your contact email', 'parcelpanel') ?></p>
      <input id="pp-modal-feedback__email" v-model="fbEmail" type="text" placeholder="<?php esc_html_e('e.g. parcelpanel100@gmail.com', 'parcelpanel') ?>" class="components-placeholder__input" style="width:100%;margin:0;height:36px;border-radius:2px;">
      <template slot="footer">
        <pp-button variant="secondary" @click="isOpenFeedbackModal=false"><?php esc_html_e('Cancel', 'parcelpanel') ?></pp-button>
        <pp-button variant="primary" :is-busy="isSendingFeedback" :disabled="isSendingFeedback" @click="onSendFeedback"><?php esc_html_e('Send', 'parcelpanel') ?></pp-button>
      </template>
    </modal>

    <h2><?php esc_html_e('Account', 'parcelpanel') ?></h2>
    <div class="pp-flex-row account-container-content-box">
      <div class="left pp-card-light">
        <h3 class="pp-card-title"><?php esc_html_e('Current plan info', 'parcelpanel') ?></h3>
        <content-placeholders v-if="statusRequest.LOADING === reqStatus">
          <content-placeholders-text :lines="3" />
        </content-placeholders>

        <template v-else-if="statusRequest.FINISHED === reqStatus">
          <p v-if="isUnlimitedPlan">
            <?php
            echo sprintf(
              // translators: %1$s is plan %2$s is order count.
              esc_html__('You are on the ParcelPanel %1$s plan and have %2$s cycle.', 'parcelpanel'),
              'Unlimited',
              'unlimited quota per month'
            ) ?>
          </p>
          <p v-else>
            <?php
            echo sprintf(
              // translators: %1$s is plan %2$s is order count %3$s is time.
              esc_html__('You are on the ParcelPanel %1$s plan and have %2$s cycle. Next cycle will reset on %3$s.', 'parcelpanel'),
              '{{planName}}',
              '{{summary}}',
              '{{expiredDate}}'
            ) ?>
          </p>
        </template>

        <p v-else><?php esc_html_e('The ParcelPanel server is busy. Please try again later!', 'parcelpanel') ?></p>
      </div>
      <div class="right">
        <div class="pp-card" v-if="statusRequest.LOADING === reqStatus">
          <content-placeholders>
            <content-placeholders-heading img></content-placeholders-heading>
          </content-placeholders>
        </div>

        <template v-else-if="statusRequest.FINISHED === reqStatus">
          <!-- Unlimited -->
          <div class="pp-card" v-if="isUnlimitedPlan">
            <div class="pp-card-head">
              <h3 class="pp-card-title">{{ planName }}</h3>
              <a v-if="urlLoginDashboard" :href="urlLoginDashboard" target="_blank">{{ i18n.login_dashboard }}</a>
            </div>

            <div class="pp-card-body">
              <div style="display:flex">
                <p>{{ i18n.remaining }} / {{ i18n.total }}</p>
                <p style="flex:1;text-align:right;color:#1d2327;font-weight:600;font-size:20px;line-height:28px;">Unlimited / Unlimited</p>
              </div>
              <div class="pp-m-t-2 pp-m-b-4" style="width: 100%">
                <pp-progress w="100"></pp-progress>
              </div>
              <p style="color: #50575E;">
                <?php
                // translators: %1$s is quota.
                echo sprintf(esc_html__('Note: Remaining means you have %1$s available quota.', 'parcelpanel'), 'unlimited')
                ?>
              </p>
            </div>
          </div>

          <!-- Essential -->
          <div class="pp-card" v-else>
            <div class="pp-card-head">
              <h3 class="pp-card-title">{{ planName }}</h3>
              <a v-if="urlLoginDashboard" :href="urlLoginDashboard" target="_blank">{{ i18n.login_dashboard }}</a>
            </div>

            <div class="pp-card-body">
              <div style="display:flex">
                <p>{{ i18n.remaining }} / {{ i18n.total }}</p>
                <p style="flex:1;text-align:right;color:#1d2327;font-weight:600;font-size:20px;line-height:28px;">{{quotaRemain}} / {{quota}}</p>
              </div>
              <div class="pp-m-t-2 pp-m-b-4" style="width: 100%">
                <pp-progress :w="quotaProgressWidth"></pp-progress>
              </div>
              <p style="color: #50575E;">
                <?php
                // translators: %1$s is quota.
                echo sprintf(esc_html__('Note: Remaining means you have %1$s available quota.', 'parcelpanel'), '{{quotaRemain}}') ?>
              </p>
            </div>
          </div>
        </template>
      </div>
    </div>

    <div class="pp-flex-row pp-m-t-5 account-container-content-box">
      <div class="left pp-card-light">
        <h3 class="pp-card-title"><?php esc_html_e('Plan', 'parcelpanel') ?></h3>
        <p><?php esc_html_e('If you want to change your plan, the remaining quota of current plan will be added to the new plan.', 'parcelpanel') ?></p>
        <p class="pp-m-t-2 pp-card-title-note"><?php esc_html_e('Note: ParcelPanel counts the quota based on the number of your orders synced to ParcelPanel and offers unlimited order lookups.', 'parcelpanel'); ?></p>
      </div>
      <div class="right">
        <!-- skeleton screen -->
        <div v-if="statusRequest.LOADING === reqStatus" class="pp-plan-card">
          <content-placeholders style="padding:16px 20px 20px">
            <content-placeholders-heading v-for="i of 3" :key="i" img></content-placeholders-heading>
          </content-placeholders>
        </div>

        <!-- data -->
        <div v-else-if="statusRequest.FINISHED === reqStatus" class="pp-plan-card">
          <div v-for="plan in plans" :key="plan.id" class="plan-item">
            <div class="plan-item-box">
              <div class="plan-title" v-html="plan.title"></div>
              <div class="pp-m-t-2">
                <p>{{plan.summary}}</p>
                <!--<p><?php /*echo sprintf( esc_html__( '%1$s quota per %2$s-day.', 'parcelpanel' )
                      , '{{plan.quota}}', '{{plan.cycle}}' ) */ ?></p>-->
              </div>
            </div>
            <div class="pp-button-style">
              <pp-button v-if="planId !== plan.id" :is-busy="plan.id === chosenPlanId" :variant="plan.id === chosenPlanId ? 'primary' : 'secondary'" :disabled="!planId || chosenPlanId" @click="choosePlan(plan.id)">{{ plan.is_unlimited_quota ? i18n.get_100off : i18n.choose_plan }}</pp-button>
              <p v-else class="pp-p-r-3"><?php esc_html_e('Current plan', 'parcelpanel') ?></p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <pp-popup-pic></pp-popup-pic>
  </div>
</template>