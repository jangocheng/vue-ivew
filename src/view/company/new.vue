<style lang="less" scoped>
    @import "./new.less";
</style>
<template>
    <div class="new">
        <div class="title">
            <li v-for="(item,index) in typeTitle" :key="index">
                <a :style="typeIndex==index?typeActive:''" @click="typeIndex=index">{{item}}</a>
            </li>
        </div>
        <div class="content">
            <ul class="list">
                <li v-for="(item,index) in data2" :key="index">
                    <img src="../../images/home/one.png" alt="">
                    <div>
                        <h2>扎心了春节，我在发红包，交易员却在赚美刀</h2>
                        <p>全网交易员@Octavus ，10周收益率111.81%，期间净值最大回撤约为33%。净值 18164美元，总收益11732美</p>
                        <p>
                            <span>22小时前</span>
                        </p>
                    </div>
                </li>
            </ul>
            <div class="pagenation">
                <Page :total="100" @on-change="pagechange"></Page>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                typeTitle: ["公司动态", "媒体报道", "热门活动"],
                typeActive: {
                    borderBottom: " 2px solid #0263ff",
                    color: "#0263ff"
                },
                typeIndex: 0,
                data2: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                total: 150,
                current: 1
            };
        }
    };
</script>