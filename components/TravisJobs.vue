<template>
  <v-content>
    <v-layout
      row
      wrap
      justify-center
    >
      <!-- TEMP - DO NOT DELETE - WAITING ON BRANCH IMG UPDATES

        <v-flex id="jobs-slug-left" xs12 md6 mt-5 class="text-xs-center">
        <img v-if="!brokenImgLink" class="trs-jobs-img" :src="slugLeftImageSrc" alt="A company photo for this store." @error="brokenImgLink=true">
        <img v-else class="trs-jobs-img" :src="jobsImage" alt="A company photo for this store.">
      </v-flex> -->
      <v-flex
        id="jobs-slug-right"
        xs12
        md6
        mt-5
        class="text-xs-center"
      >
        <br v-if="!isMobile">
        <br v-if="!isMobile">
        <br v-if="!isMobile">
        <div
          :class="{'subheading': isMobile, 'headline': !isMobile, 'mt-4': !isMobile}"
          class="text-xs-center"
        >
          {{ slugTitle }}
        </div>
        <br>
        <v-card-text
          :class="{'body-1': isMobile, 'subheading': !isMobile}"
          class="text-xs-center copper500--text"
        >
          <p>
            {{ slugText }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-layout
            row
            wrap
            justify-center
          >
            <v-flex
              xs12
              sm4
              order-xs1
              mt-2
            >
              <v-btn
                color="copper900 info--text"
                @click="fetchLocalIndeedJobs()"
              >
                <span class="body-2">
                  Jobs Near Me
                </span>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-flex>
    </v-layout>
    <v-dialog
      v-model="dialog"
      :overlay="false"
      fullscreen
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card>
        <v-toolbar
          style="flex: 0 0 auto;"
          dark
          class="primary"
          dense
        >
          <v-btn
            icon
            dark
            @click.native="dialog = false"
          >
            <v-icon>close</v-icon>
          </v-btn>
          <v-spacer />
          <v-toolbar-title>Travis Roofing Supply Job Application</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-icon>work</v-icon>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-form
            id="jobForm"
            ref="jobForm"
            v-model="valid"
            method="post"
          >
            <input
              :value="netlifyForm"
              type="hidden"
              name="form-name"
            >
            <v-layout row>
              <v-flex
                xs12
                mt-2
                class="text-xs-center"
              >
                <span class="copper500--text body-1">
                  Prospective employees will receive consideration regardless of race, creed, color, sex, age, national origin, handicap or veteran status.
                </span>
                <br>
                <span class="body-2">
                  Equal Opportunity Employer
                </span>
              </v-flex>
            </v-layout>
            <v-subheader>About You:</v-subheader>
            <v-layout
              row
              wrap
            >
              <v-flex
                xs8
                md5
                mt-4
                ml-4
                mb-4
              >
                <v-text-field
                  v-model.trim="jobApplicant.name"
                  :value="jobApplicant.name"
                  :rules="nameRules"
                  :counter="60"
                  label="Name"
                  name="name"
                  required
                />
                <v-text-field
                  v-model.trim="jobApplicant.email"
                  :value="jobApplicant.email"
                  :rules="emailRules"
                  label="E-mail"
                  name="email"
                  required
                />
                <v-text-field
                  v-model.trim="jobApplicant.phone"
                  :value="jobApplicant.phone"
                  :rules="phoneRules"
                  label="Phone"
                  name="phone"
                  required
                />
              </v-flex>
              <v-flex
                :class="{'mb-4 ml-4': isMobile}"
                xs8
                md5
                offset-md1
                mt-4
              >
                <v-text-field
                  v-model.trim="jobApplicant.address"
                  :value="jobApplicant.address"
                  :rules="addressRules"
                  label="Address"
                  name="address"
                  required
                />
                <v-text-field
                  v-model.trim="jobApplicant.bestTimeToCall"
                  :value="jobApplicant.bestTimeToCall"
                  :rules="timeRules"
                  label="Best Time Of Day"
                  name="bestTimeToCall"
                  required
                />
                <v-text-field
                  v-model.trim="jobApplicant.website"
                  :value="jobApplicant.website"
                  :rules="websiteRules"
                  label="Website (optional)"
                  name="website"
                />
                <v-list-tile avatar>
                  <v-list-tile-action>
                    <v-checkbox
                      v-model="jobApplicant.eligibleUSworker"
                      :value="jobApplicant.eligibleUSworker"
                      name="eligibleUSworker"
                      color="copper500"
                      type="checkbox"
                    />
                    <input
                      :value="jobApplicant.eligibleUSworker"
                      type="checkbox"
                      name="eligibleUSworker"
                      hidden
                    >
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>Legally eligible to work in the U.S?</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-flex>
            </v-layout>
            <v-divider class="copper500" />
            <v-subheader>About this position:</v-subheader>
            <v-layout
              row
              wrap
            >
              <v-flex
                xs8
                md5
                mt-4
                ml-4
                mb-4
              >
                <v-text-field
                  v-model.trim="jobApplicant.positionDesired"
                  :value="jobApplicant.positionDesired"
                  :rules="generalTextRules"
                  label="Position desired?"
                  name="positionDesired"
                />
                <v-text-field
                  v-model.trim="jobApplicant.whyIWantToWorkHere"
                  :rules="generalTextRules"
                  :value="jobApplicant.whyIWantToWorkHere"
                  label="Why do you feel you would be a good fit for this position?"
                  name="whyIWantToWorkHere"
                  textarea
                />
              </v-flex>
              <v-flex
                :class="{'mb-4 ml-4': isMobile}"
                xs8
                md5
                mt-4
                offset-md1
              >
                <v-text-field
                  v-model.trim="jobApplicant.desiredSalary"
                  :value="jobApplicant.desiredSalary"
                  :rules="generalTextRules"
                  label="Desired salary?"
                  name="desiredSalary"
                />
                <v-text-field
                  v-model.trim="jobApplicant.availableToStart"
                  :value="jobApplicant.availableToStart"
                  :rules="generalTextRules"
                  label="When can you start?"
                  name="availableToStart"
                />
              </v-flex>
            </v-layout>
            <v-subheader>How did you hear about this position?</v-subheader>
            <v-layout
              row
              wrap
            >
              <v-flex
                xs8
                md5
                mb-4
                ml-4
                mt-4
              >
                <v-list
                  three-line
                  subheader
                >
                  <v-list-tile avatar>
                    <v-list-tile-action>
                      <v-checkbox
                        v-model="jobApplicant.heardAboutUsFromOnline"
                        :value="jobApplicant.heardAboutUsFromOnline"
                        color="copper500"
                        name="heardAboutUsFromOnline"
                        type="checkbox"
                      />
                      <input
                        :value="jobApplicant.heardAboutUsFromOnline"
                        type="checkbox"
                        name="heardAboutUsFromOnline"
                        hidden
                      >
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Online</v-list-tile-title>
                      <v-list-tile-sub-title>A website, job board, or search engine.</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile avatar>
                    <v-list-tile-action>
                      <v-checkbox
                        v-model="jobApplicant.heardAboutUsFromReferral"
                        :value="jobApplicant.heardAboutUsFromReferral"
                        color="copper500"
                        name="heardAboutUsFromReferral"
                        type="checkbox"
                      />
                      <input
                        :value="jobApplicant.heardAboutUsFromReferral"
                        type="checkbox"
                        name="heardAboutUsFromReferral"
                        hidden
                      >
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Referral</v-list-tile-title>
                      <v-list-tile-sub-title>Referred by someone who works at Travis Roofing Supply</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile avatar>
                    <v-list-tile-action>
                      <v-checkbox
                        v-model="jobApplicant.heardAboutUsFromRecruiter"
                        :value="jobApplicant.heardAboutUsFromRecruiter"
                        color="copper500"
                        name="heardAboutUsFromRecruiter"
                        type="checkbox"
                      />
                      <input
                        :value="jobApplicant.heardAboutUsFromRecruiter"
                        type="checkbox"
                        name="heardAboutUsFromRecruiter"
                        hidden
                      >
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>A Recruiter</v-list-tile-title>
                      <v-list-tile-sub-title>An individual or recruitment agency</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-flex>
              <v-flex
                :class="{'mb-4 ml-4': isMobile}"
                xs8
                md5
                offset-md1
                mt-4
              >
                <v-text-field
                  v-model.trim="jobApplicant.whereOnline"
                  :value="jobApplicant.whereOnline"
                  :rules="generalTextRules"
                  label="Where online? (Optional)"
                  name="whereOnline"
                />
                <v-text-field
                  v-model.trim="jobApplicant.whoReferred"
                  :value="jobApplicant.whoReferred"
                  :rules="generalTextRules"
                  label="Who referred you? (Optional)"
                  name="whoReferred"
                />
                <v-text-field
                  v-model.trim="jobApplicant.whoRecruited"
                  :value="jobApplicant.whoRecruited"
                  :rules="generalTextRules"
                  label="Name Of Recruiter (Optional)"
                  name="whoRecruited"
                />
              </v-flex>
            </v-layout>
            <v-divider class="copper500" />
            <v-subheader>Please attach your resume:</v-subheader>
            <v-layout row>
              <v-flex
                xs8
                ml-3
                mb-3
              >
                <input
                  :rules="resumeRules"
                  type="file"
                  name="uploadedResume"
                  size="40"
                >
              </v-flex>
            </v-layout>
            <v-divider class="copper500" />
            <v-subheader>Please Submit Your Application</v-subheader>
            <v-btn
              :disabled="!valid"
              color="copper900 info--text"
              @click="submit"
            >
              Submit
            </v-btn>
            <v-btn
              color="copper900 info--text"
              @click="clear"
            >
              clear
            </v-btn>
          </v-form>
        </v-card-text>
        <div style="flex: 1 1 auto;" />
      </v-card>
    </v-dialog>
  </v-content>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import branding from '@/assets/brandai.json'
const brandImages = branding.lookup.images

export default {
  name: 'TravisJobs',
  data () {
    return {
      brokenImgLink: false, // This flag is raised when slug image is broken
      slugText: 'We are always looking for the best talent to join our team.  If you are interested in a career with Travis Roofing Supply, you can check for open positions close to your area.',
      slugTitle: 'Come Work With Us!',
      dialog: false,
      netlifyForm: 'fake-job-form-test4',
      valid: false,
      generalTextRules: [
        // Test for special chars. Still sanitize on POST. These are not the vals sent, name vals are
      ],
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => v.length <= 60 || 'Name must be less than 60 characters'
      ],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      phoneRules: [
        // Test for valid U.S phone number
      ],
      addressRules: [
        // Test for valid address format
      ],
      timeRules: [
        // Consider putting a date widget of some kind here, instead.
      ],
      websiteRules: [
        // Test for valid URI fromat
      ],
      resumeRules: [
        // If this does not work, you absolutely need to limit size and extensions in some other way
      ],
      jobApplicant: {
        name: '',
        email: '',
        phone: '',
        address: '',
        bestTimeToCall: '',
        website: '',
        eligibleUSworker: false,
        whereOnline: '',
        whoReferred: '',
        whoRecruited: '',
        heardAboutUsFromOnline: false,
        heardAboutUsFromReferral: false,
        heardAboutUsFromRecruiter: false,
        positionDesired: '',
        whyIWantToWorkHere: '',
        desiredSalary: '',
        availableToStart: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'getCurrentBranch'
    ]),
    // v-avatar no longer accepts unit type. size interpretted in pixels
    // slugLeftImgSize () {
    //   switch (this.$vuetify.breakpoint.name) {
    //     case 'xs': return '100%'
    //     case 'sm': return '100%'
    //     case 'md': return '100%' // 435.2px
    //     case 'lg': return '100%' // 512px
    //     case 'xl': return '100%' // 512px
    //   }
    // },
    slugLeftImageSrc () {
      let imgToRender = 'https://s3-us-west-2.amazonaws.com/travis-location-api-development/storefronts/' +
        this.getCurrentBranch.slug + '.jpg'

      return imgToRender
    },
    jobsImage () {
      return brandImages.travisJobs512X512Png.url
    },
    isMobile () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return true
        case 'sm':
          return true
        case 'md':
          return false
        case 'lg':
          return false
        case 'xl':
          return false
      }
      return false
    }
  },
  watch: {
    getCurrentBranch: function () { // this watcher resets the img flag when site branch changes
      this.brokenImgLink = false
    }
  },
  methods: {
    fetchLocalIndeedJobs () {
      let jobScreen = 'https://www.indeed.com/jobs?q=Travis+Roofing+Supply&l='
      let region = this.getCurrentBranch.region + '%2C+'
      let state = this.getCurrentBranch.state
      let radius = '&radius=' + 100
      jobScreen += region
      jobScreen += state
      jobScreen += radius
      console.log('Fetching Indeed job screen for ' + this.getCurrentBranch.region)
      window.open(jobScreen, '_blank')
    },
    clear () {
      this.$refs.jobForm.reset()
    },
    submit () {
      // Grab short hand reference to run Vuetify validate()
      let vuetifyForm = this.$refs.jobForm
      // Grab short hand reference for native submit
      let nativeForm = document.getElementById('jobForm')
      if (vuetifyForm.validate()) {
        nativeForm.submit()
      }
    }
  }
}
</script>

<style scoped>
.trs-jobs-img {
  width: 100%;
  height: auto;
  max-width: 512px;
}

p {
  text-align: left !important;
}

li {
  list-style: none;
}
</style>
