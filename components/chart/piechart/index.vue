<template>
	<view>
		<uni-ec-canvas class="uni-ec-canvas" id="uni-ec-canvas" ref="canvas" canvas-id="uni-ec-canvas" :ec="ec">
		</uni-ec-canvas>
	</view>
</template>

<script>
	import uniEcCanvas from '@/components/uni-ec-canvas/uni-ec-canvas.vue'
	import * as echarts from '@/components/uni-ec-canvas/echarts'
	let chart = null
	export default {
		components: {
			uniEcCanvas
		},
		props: {
			abnormal: {
				type: Number,
				// 定义是否必须传
				required: true,
				// 定义默认值
				default: 0
			},
			absence: {
				type: Number,
				// 定义是否必须传
				required: true,
				// 定义默认值
				default: 0
			},
		},
		data() {
			return {
				ec: {
					//是否懒加载
					lazyLoad: true
				},
			}
		},
		methods: {
			initChart(canvas, width, height, canvasDpr) {
				chart = echarts.init(canvas, null, {
					width: width,
					height: height,
					devicePixelRatio: canvasDpr
				})
				canvas.setChart(chart)
				var data=[{value:this.abnormal, name:'正常',"itemStyle":{"normal":{"color":"#00CCB8"}}},
					{value:this.absence, name:'异常',"itemStyle":{"normal":{"color":"#FFCB96"}}}];
				var dataName = data.reduce((per,cur,i)=>{per[i]=cur.name;return per},[]);
				var a=0;
				for(var i=0; i<data.length; i++)
				{
					a+=data[i].value;
				}
				data.push({value:a, name:'__other', itemStyle:{normal:{color:'rgba(0,0,0,0)'}}});
				let option = {
					legend: {
						orient: "horizontal",//图例的布局，水平布局、垂直布局
						icon:'circle',
						bottom:50,
						textStyle: {//图例字体样式
							color: "#00CCB8",
							fontSize: 15,
							fontFamily: "微软雅黑"
						},
						data:dataName,
						formatter: e =>{
							let val=0;
							data.forEach(el => {
								if(e == el.name) val = el.value
							});
							return `${e}${val}天`
						}
					},
					series : [
						{
							name: '上下班统计',
							type: 'pie',
							startAngle:-180,
							radius : '95%',
							center: ['50%', '60%'],
							data:data,
							itemStyle: {
								borderRadius:0,
								borderColor:'#fff',
								borderWidth:5
							},

							label: {
								normal: {
									show: false,
								},
							},
							labelLine: {
								normal: {
									show: false
								}
							},
						}
					]
				};
				chart.setOption(option)
				return chart
			},
		},
		mounted() {
			this.$refs.canvas.init(this.initChart)
		}
	}
</script>
<style>
	.uni-ec-canvas {
		width: 100%;
		height: 500rpx;
		display: block;
		margin-top: 30rpx;
	}
</style>

