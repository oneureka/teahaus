<template>
  <view class="feedback">
    <view class="feedback-form">
      <view class="form-item">
        <view class="form-label-wrapper">
          <text class="form-label-required">*</text>
          <text class="form-label">反馈类型</text>
        </view>
        <picker
          class="form-picker"
          :range="feedbackTypes"
          range-key="label"
          :value="selectedType"
          @change="onTypeChange"
        >
          <view class="picker-value">
            <text>{{ feedbackTypes[selectedType].label }}</text>
            <image
              class="picker-arrow"
              src="@/assets/icons/icon-arrow@2x.png"
              mode="aspectFit"
            />
          </view>
        </picker>
      </view>
      <view class="form-item">
        <view class="form-label-wrapper">
          <text class="form-label-required">*</text>
          <text class="form-label">反馈内容</text>
        </view>
        <textarea
          class="form-textarea"
          :class="{ 'form-textarea-focus': isTextareaFocus }"
          placeholder="请描述您的问题或建议"
          v-model="feedbackContent"
          maxlength="500"
          @focus="onTextareaFocus"
          @blur="onTextareaBlur"
          @input="onContentInput"
        />
        <view class="form-footer">
          <text v-if="showContentError" class="form-error">请填写反馈内容</text>
          <text class="form-count">{{ feedbackContent.length }}/500</text>
        </view>
      </view>
      <SubmitButton
        :text="submitting ? '提交中...' : '提交反馈'"
        :disabled="submitting"
        @tap="onSubmit"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMockSubmit } from '@/composables/useMockSubmit'
import SubmitButton from '@/components/SubmitButton/index.vue'
import './index.css'

interface FeedbackType {
  value: number
  label: string
}

interface PickerEvent {
  detail: { value: number }
}

const feedbackTypes: FeedbackType[] = [
  { value: 0, label: '产品建议' },
  { value: 1, label: '服务投诉' },
  { value: 2, label: '预订问题' },
  { value: 3, label: '支付问题' },
  { value: 4, label: '其他问题' }
]

const selectedType = ref(0)
const feedbackContent = ref('')
const isTextareaFocus = ref(false)
const showContentError = ref(false)

const { submitting, submit } = useMockSubmit({
  loadingText: '提交中...',
  successText: '提交成功',
  delay: 1000
})

const onTextareaFocus = () => {
  isTextareaFocus.value = true
}

const onTextareaBlur = () => {
  isTextareaFocus.value = false
}
const onContentInput = () => {
  showContentError.value = false
}

const onTypeChange = (e: PickerEvent) => {
  selectedType.value = e.detail.value
}

const onSubmit = () => {
  if (!feedbackContent.value.trim()) {
    showContentError.value = true
    return
  }

  submit(() => {
    feedbackContent.value = ''
    selectedType.value = 0
  })
}
</script>
