<template>
  <view class="protocol">
    <view v-html="htmlText"></view>
  </view>
</template>

<script>
import { protocol } from "./protocol.js";
export default {
  components: {},
  data() {
    return {
      htmlText: "",
      titleObj: {
        yh: "用户协议",
        ys: "隐私政策",
        fw: "服务协议",
      },
    };
  },
  onLoad(options) {
    if (options.key) {
      this.htmlText = protocol[options.key];
      uni.setNavigationBarTitle({
        title: this.titleObj[options.key],
      });
    }
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.protocol {
  padding: 40rpx 30rpx;
  line-height: 60rpx;
}
code {
  white-space: pre-wrap;
}
span.smallcaps {
  font-variant: small-caps;
}
span.underline {
  text-decoration: underline;
}
div.column {
  display: inline-block;
  vertical-align: top;
  width: 50%;
}
div.hanging-indent {
  margin-left: 1.5em;
  text-indent: -1.5em;
}
ul.task-list {
  list-style: none;
}
</style>