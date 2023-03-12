<template>
	<view class="content generalform">
		<view class="form-itemblock" v-if="!item.hideflg" v-for="(item, idx) in formdata" :key="idx">
			<view v-if="item.title" class="block-title">{{ item.title }}</view>
			<view v-if="item.deleteflg" class="deleteicon flex-center" @click="deleteformitem(idx)">x</view>
			<view v-if="item.fields.length" class="block-body">
				<view v-if="!jtem.hideflg" class="fields-item flex-align-center"
					:style="{alignItems:jtem.datatype=='textarea'?'flex-start':'center'}"
					v-for="(jtem, jdx) in item.fields" :key="jdx">
					<view class="flex-between-center" v-if="Array.isArray(jtem)">
						<view class="flex-align-center"
							:style="{ width: ktem.width || 'auto', marginRight: ktem.marginRight || 0 }"
							v-for="(ktem, kdx) in jtem" :key="kdx">
							<view v-if="ktem.name" class="fields-name">{{ ktem.name }}</view>
							<block>
								<view v-if="ktem.datatype == 'number'" class="fields-value"><input type="number"
										v-model="ktem.value" /></view>
								<view v-if="ktem.datatype == 'digit'" class="fields-value"><input type="digit"
										v-model="ktem.value" /></view>
								<view v-if="ktem.datatype == 'varchar'" class="fields-value"><input type="text"
										v-model="ktem.value" /></view>
								<view @click="codetableclick(idx,jdx,kdx)" v-if="ktem.datatype == 'codetable'"
									class="fields-value">
									<input disabledColor="#fff" disabled type="text" v-model="ktem.value" />
								</view>
								<view class="flex" v-if="ktem.datatype == 'msgbutton'">
									<view>{{ ktem.text }}</view>
									<view class="msgbtn" @click="msgbtnclick(ktem.addindex)">{{ ktem.linkname }}</view>
								</view>
								<block v-if="ktem.datatype == 'img'">
									<view v-if="ktem.value.length == 0" class="noimg-box"></view>
									<view v-else class="">
										<swiper autoplay>
											<swiper-item @click="swiperclick(ldx, idx, jdx, ldx)"
												v-for="(ltem, ldx) in ktem.value" :key="ldx">
												<image mode="aspectFill" :src="ltem.thumbTempFilePath || ltem.path">
												</image>
											</swiper-item>
										</swiper>
									</view>
								</block>
							</block>
						</view>
					</view>
					<block v-else>
						<view v-if="jtem.datatype!='mark' && jtem.name" class="fields-name">{{ jtem.name }}</view>
						<block v-if="!jtem.hideflg">
							<view v-if="jtem.datatype == 'number'" class="fields-value"><input
									@input="inputchange(jtem, idx, jdx)" type="number" v-model="jtem.value" /></view>
							<view v-if="jtem.datatype == 'digit'" class="fields-value"><input type="digit"
									@input="inputchange(jtem, idx, jdx)" v-model="jtem.value" /></view>
							<view v-if="jtem.datatype == 'varchar'" class="fields-value"><input type="text"
									v-model="jtem.value" /></view>
							<view @click="codetableclick(idx,jdx)" v-if="jtem.datatype == 'codetable'"
								class="fields-value">
								<input disabledColor="#fff" disabled type="text" v-model="jtem.value" />
							</view>
							<view class="flex" v-if="jtem.datatype == 'msgbutton'">
								<view>{{ jtem.text }}</view>
								<view class="msgbtn" @click="msgbtnclick(jtem.addindex)">{{ jtem.linkname }}</view>
							</view>
							<view class="flex" v-if="jtem.datatype == 'mark'">
								<view>{{ jtem.text }}</view>
								<view class="msgbtn" @click="markclick(idx, jdx)">{{ jtem.linkname }}</view>
							</view>
							<view class="flex" v-if="jtem.datatype == 'textarea'">
								<textarea v-model="jtem.value">{{ jtem.linkname }}</textarea>
							</view>
							<view style="position: relative;width: 100%;" v-if="jtem.datatype == 'img'">
								<view v-if="jtem.value.length == 0" class="noimg-box flex-column-center"
									@click="tocamera(idx, jdx)">
									<view class="noimg">
									</view>
									<view class="">
										拍摄/上传图片
									</view>
								</view>
								<swiper :current="imgidx" @change='swiperChange' circular v-else style="width: 100%;height: 320rpx;">
									<swiper-item v-for="(ktem, kdx) in jtem.value" :key="kdx"
										@click="swiperclick(idx, jdx, kdx)">
										<image style="width: 100%;height: 100%;" mode="aspectFill"
											:src="ktem.thumbTempFilePath || ktem.path"></image>
									</swiper-item>
								</swiper>
								<view @click="tocamera(idx,jdx)" v-if="jtem.value.length" class="imgnum-add">
									添加
								</view>
								<view @click="deleteimg(idx,jdx)" v-if="jtem.value.length" class="imgnum-delete">
									删除
								</view>
								<view v-if="jtem.value.length" class="imgnum-info">
									{{imgidx+1}}/{{jtem.value.length}}
								</view>
							</view>
							<view v-if="jtem.datatype == 'detail'" class="detail">
								<view class="flex-align-center">
									<!-- <view class="">{{ jtem.value.name }}</view>
									<view class="">{{jtem.value.code}}</view> -->
									<card1 :style='{width:"100%"}' :data='jtem.value'></card1>
								</view>
							</view>
							<view v-if="jtem.datatype == 'radio'" class="radio-box flex-around-center">
								<view @click="radioclick(idx, jdx, kdx)" class="radio-item flex-align-center"
									v-for="(ktem, kdx) in jtem.value" :key="kdx">
									<view class="radio-itemname">{{ ktem.name }}</view>
									<view :class="ktem.checked ? 'radio-checked' : 'radio-nochecked'"></view>
								</view>
							</view>
							<view v-if="jtem.datatype == 'link'" @click="linkclick(idx, jdx, jtem.addindex)"
								class="noitem-box flex-center">{{ jtem.text }}</view>
						</block>
					</block>
				</view>
			</view>
		</view>
		<block v-if='reason.length'>
			<view v-for="(item,i) in reason" class="form-itemblock">
				<view v-if="item.title" class="block-title">{{ item.title }}</view>
				<view v-if="item.info" class="block-body">
					<view class="fields-item flex-align-center">
						{{item.info}}
					</view>
				</view>
			</view>
		</block>
		<view v-if="btnlist.length" class="foot flex-center">
			<view :class="index==0?'cancel-btn':'confirm-btn'" class="btn-item" @click="btnclick(item)"
				v-for="(item,index) in btnlist" :key="index">
				{{item.controlname}}
			</view>
		</view>
		<modal1 v-if="modal1flg" @click="modalClick"></modal1>
		<modal2 :data='modal2data' @cancel='modal2cancel' @confirm='modal2confirm' v-if="modal2flg" @click="modalClick">
		</modal2>
	</view>
</template>

<script>
	import {
		getPageConfig,
		getPageButtons,
		getFormById,
		getEditForm,
		delFormByOnetimeId,
		saveForm,
		getWorkTotal,
		uplodurl
	} from '@/config/api.js';
	import card1 from '@/components/listcard/card1.vue'
	import modal1 from '@/components/custommodal/modal1.vue'
	import modal2 from '@/components/custommodal/modal2.vue'
	import {
		getLocation
	} from '@/utils/location.js'
	export default {
		data() {
			return {
				formid: '',
				formdata: [],
				formdata_source: [],
				btnlist: [],
				relationid: '',
				onetimeid: '',
				modal1flg: false,
				modal2flg: false,
				modal2data: null,
				reason: [],
				imgidx: 0,
			};
		},
		onLoad(props) {
			this.formid = props.formid;
			if (props.formid && props.onetimeid) {
				this.onetimeid = props.onetimeid
				this.getdetail()
			} else {
				if (props.relationid) {
					this.relationid = props.relationid
				}
				let params = {
					id: this.formid
				}
				if (uni.getStorageSync('selectcode')) {
					params.cards = [...uni.getStorageSync('selectcode')]
				}
				getFormById(params).then((res) => {
					if (res.data.code == 0) {
						this.formdata = JSON.parse(res.data.data.fieldinfov2)
						this.formdata_source = JSON.parse(res.data.data.fieldinfov2)
						uni.setNavigationBarTitle({
							title: res.data.data.formname
						})
					}
				})
			}
			if (props.pageid) {
				getPageConfig({
					pageid: props.pageid
				}).then(res => {});
				getPageButtons({
					pageid: props.pageid,
					id: props.onetimeid || '',
					formid: props.formid || ''
				}).then((res) => {
					if (res.data.code == 0) {
						this.btnlist = res.data.data
						if (!this.btnlist.length) {
							this.btnlist.push({
								clickedtype: 0,
								controlname: "确认",
								controleng: 'add'
							})
						}
					}
				});
			}
		},
		onUnload() {
			uni.removeStorage({
				key: 'selectcode'
			})
		},
		components: {
			card1,
			modal1,
			modal2
		},
		onShow() {
			getLocation()
		},
		methods: {
			//图片滑动
			swiperChange(e) {
				this.imgidx = e.detail.current
			},
			//以后再说
			modal2cancel() {
				uni.navigateBack({
					delta: this.onetimeid ? 1 : 2
				})
			},
			//现在处理
			modal2confirm() {
				uni.redirectTo({
					url: "/pages/business/record?yewuid=" + this.modal2data.yewuid
				})
			},
			//检疫异常确定按钮
			modalClick() {
				let arr = this.getparams()
				saveForm(arr).then((res) => {
					if (res.data.code == 0) {
						uni.navigateBack()
					}
				})
				this.modal1flg = false
			},
			//点击物种，去到物种选择页面
			codetableclick(idx, jdx, kdx) {
				let _self = this
				let arr = _self.formdata[idx].fields[jdx]
				let pageid = ''
				if (Array.isArray(arr)) {
					pageid = _self.formdata[idx].fields[jdx][kdx].pageid
				} else {
					pageid = _self.formdata[idx].fields[jdx].pageid
				}
				uni.navigateTo({
					url: `/pages/business/codelist?radioflg=true&pageid=${pageid}`,
					events: {
						getchoose(data) {
							console.log(data, '选择的物种')
							if (Array.isArray(arr)) {
								_self.$set(_self.formdata[idx].fields[jdx][kdx], 'code', data.code)
								_self.$set(_self.formdata[idx].fields[jdx][kdx], 'value', data.name)
							} else {
								_self.$set(_self.formdata[idx].fields[jdx], 'code', data.code)
								_self.$set(_self.formdata[idx].fields[jdx], 'value', data.name)
							}
						}
					}
				})
			},
			//获取表单详情
			getdetail() {
				getEditForm({
					id: this.onetimeid,
					formid: this.formid
				}).then((res) => {
					if (res.data.code == 0) {
						this.formdata = JSON.parse(res.data.data.sourcejson)
						this.formdata_source = JSON.parse(res.data.data.sourcejson)
						this.reason = res.data.data.reason || []
					}
				})
			},
			//点击文字中的按钮
			msgbtnclick(idx) {
				let formitem = JSON.parse(JSON.stringify(this.formdata_source[idx]));
				formitem.deleteflg = true;
				this.formdata.splice(idx + 1, 0, formitem);
			},
			//点击备注文字中的按钮
			markclick(idx, jdx) {
				console.log(idx, jdx)
				this.$set(this.formdata[idx].fields, jdx, {
					datatype: 'textarea',
					field: this.formdata[idx].fields[jdx].field,
					name: '备注',
					value: ''
				})
			},
			//删除表单块
			deleteformitem(idx) {
				if (this.formdata[idx].fields[0].radioflg) {
					this.$set(this.formdata[idx], 'deleteflg', false)
					this.$set(this.formdata[idx].fields[0], 'datatype', 'link')
					this.$set(this.formdata[idx].fields[0], 'value', '')
				} else {
					this.formdata.splice(idx, 1);
					if (this.formdata.length == this.formdata_source.length - 1) {
						this.formdata = this.formdata.map((item, i) => {
							if (item.hideflg) {
								hideflg = false
							}
							return item
						})
					}
				}
			},
			//点击，去到照片选择页面,kdx:当前选中项在value中的索引
			// tocamera(idx, jdx, kdx) {
			// 	const _self = this;
			// 	let url = '/pages/generalform/media';
			// 	if (_self.formdata[idx].fields[jdx].value && _self.formdata[idx].fields[jdx].value.length) {
			// 		url +=
			// 			`?list=${encodeURIComponent(JSON.stringify(_self.formdata[idx].fields[jdx].value))}&selectidx=${kdx}`;
			// 	}
			// 	console.log(url);
			// 	uni.navigateTo({
			// 		url,
			// 		events: {
			// 			getchoose(data) {
			// 				console.log(data, '拿到的值');
			// 				_self.formdata[idx].fields[jdx].value = JSON.parse(JSON.stringify(data));
			// 				console.log(_self.formdata[idx].fields[jdx].value);
			// 			}
			// 		}
			// 	});
			// },
			tocamera(idx, jdx, kdx) {
				const _self = this;
				uni.chooseImage({
					success(res) {
						console.log(res);
						res.tempFiles.map(item => {
							uni.uploadFile({
								url: uplodurl,
								filePath: item.path,
								name: 'file',
								success(ses) {
									console.log(ses, '服务器返回结果');
									_self.formdata[idx].fields[jdx].value.push({
										path: JSON.parse(ses.data).data.dbpath,
										time: Date.now(),
										checked: false
									});
								}
							});
						});
					}
				});
			},
			//删除图片
			deleteimg(idx, jdx) {
				this.formdata[idx].fields[jdx].value.splice(this.imgidx, 1)
				this.imgidx = 0
			},
			//点击轮播图
			swiperclick(idx, jdx, kdx) {
				this.tocamera(idx, jdx, kdx);
			},
			//点击按钮跳转到列表页选择
			linkclick(idx, jdx) {
				let _self = this;
				let radioflg = _self.formdata[idx].fields[jdx].radioflg
				let url = ''
				if (radioflg) {
					url =
						`/pages/business/codelist?radioflg=${_self.formdata[idx].fields[jdx].radioflg}&pageid=${_self.formdata[idx].fields[jdx].pageid}`
				} else {
					url = `/pages/business/codelist?pageid=${_self.formdata[idx].fields[jdx].pageid}`
				}
				let addblockarr = []
				this.formdata.map((item, i) => {
					if (item.isaddblock && !item.addflg) {
						if (item.fields[0].value.relationid) {
							addblockarr.push(item.fields[0].value.relationid)
						}
					}
				})
				if (addblockarr.length) {
					let addblockarr_format = Object.values(addblockarr.reduce((res, item) => {
						res[item] ? res[item].push(item) : res[item] = [item];
						return res;
					}, {}));
					let addblock_obj = {}
					addblockarr_format.map((item) => {
						addblock_obj[item[0]] = item.length
					})
					url += `&relationids=${JSON.stringify(addblock_obj)}`
					console.log(url)
				}
				uni.navigateTo({
					url,
					events: {
						getchoose(data) {
							console.log(data)
							if (radioflg) {
								_self.$set(_self.formdata[idx].fields[jdx], 'value', data)
								_self.$set(_self.formdata[idx].fields[jdx], 'datatype', 'detail')
								_self.$set(_self.formdata[idx], 'deleteflg', true)
							} else {
								let index = 0
								_self.formdata.map((item, i) => {
									if (item.isaddblock) {
										index = i
									}
								})
								data.map((item) => {
									_self.formdata.push({
										title: _self.formdata[index].title,
										deleteflg: true,
										isaddblock: true,
										fields: [{
											name: '',
											field: _self.formdata[index].fields[jdx]
												.field,
											datatype: 'detail',
											value: item
										}].concat(
											JSON.parse(JSON.stringify(_self.formdata[index]
												.fields)).slice(1).map((
												jtem) => {
												jtem.hideflg = false
												jtem.value = ''
												return jtem
											})
										)
									})
									index + 1
								})
							}
						}
					}
				})
			},
			//单选框选择
			radioclick(idx, jdx, kdx) {
				let radio = this.formdata[idx].fields[jdx].value;
				radio.forEach(item => {
					item.checked = false;
				});
				radio[kdx].checked = true;
				if (radio[kdx].hidefield) {
					if (radio[kdx].hidefield.length) {
						radio[kdx].hidefield.map((item) => {
							this.formdata[idx].fields.forEach(jtem => {
								jtem.hideflg = false
								if (jtem.field == item) {
									jtem.hideflg = true
								}
							})
						})
					} else {
						this.formdata[idx].fields.forEach(jtem => {
							jtem.hideflg = false
						})
					}
				}
			},
			//计算汇总值
			inputchange(data, idx) {
				if (!data.sumfield) return;
				let sumnum = 0;
				let sumindex = 0;
				let labelsumindex = this.formdata[idx].labelsumindex;
				if (data.sumfield) {
					console.log(data);
					this.formdata[idx].fields.forEach(item => {
						if (!Array.isArray(item)) {
							if (item.sumfield) {
								this.formdata[idx].fields[labelsumindex].forEach((jtem, jdx) => {
									if (jtem.datatype == 'labelsum') {
										sumnum += Number(item.value);
										sumindex = jdx;
										// jtem.name = jtem.sumname.replace('{sum}', jtem.value)
									}
								});
							}
						}
					});
				}
				this.formdata[idx].fields[labelsumindex][sumindex].value = sumnum;
				this.formdata[idx].fields[labelsumindex][sumindex].name = this.formdata[idx].fields[labelsumindex][
					sumindex
				].sumname.replace('{sum}', sumnum);
			},
			//组装表单保单保存中的参数
			getparams() {
				let time = Date.now()
				const formdata = JSON.parse(JSON.stringify(this.formdata));
				const arr = [];
				const arr1 = []
				const arr2 = []
				formdata.map((item, i) => {
					if (item.isaddblock && !item.addflg) {
						arr1.push(item)
					} else {
						arr2.push(item)
					}
				});
				let arr3 = []
				arr1.map((item, i) => {
					let arr4 = [...arr2]
					arr4.push(item)
					arr3[i] = [...arr4]
				})
				let arr_final = []
				//选择了动物
				if (arr3.length) {
					arr3.map((item) => {
						let obj = {}
						let relationid = ''
						item.map((jtem) => {
							jtem.fields.map((ktem, j) => {
								if (Array.isArray(ktem)) {
									ktem.map((ltem) => {
										obj[ltem.field] = {
											key: ltem.name,
											value: ltem.value,
											controltype: 0,
											code: ltem.code || ''
										};

									});
								} else {
									let value = '';
									if (ktem.field && !ktem.hideflg) {
										if (ktem.datatype == 'detail') {
											relationid = ktem.value.relationid
										}
										if (ktem.datatype == 'digit' || ktem.datatype ==
											'number' || ktem
											.datatype == 'varchar' || ktem.datatype ==
											'labelsum' || ktem.datatype == 'textarea' || ktem
											.datatype == "codetable" || ktem.datatype ==
											'img'
										) {
											value = ktem.value;
										} else if (ktem.datatype == 'detail') {
											value = ktem.value.name
											ktem.code = ktem.value.code
										} else if (ktem.datatype == 'radio') {
											ktem.value.map((ltem) => {
												if (ltem.checked) {
													value = ltem.name
												}
											})
										}
										if (ktem.code) {
											obj[ktem.field] = {
												key: ktem.name,
												value,
												controltype: 0,
												code: ktem.code
											};
										} else {
											obj[ktem.field] = {
												key: ktem.name,
												value,
												controltype: 0
											};
										}
									}
								}
							});
						})
						arr_final.push({
							service: 'fromService',
							data: {
								formid: this.formid,
								onetimeid: this.onetimeid,
								isUp: 2,
								location: {
									Address: ''
								},
								time,
								userid: uni.getStorageSync('userid') || 1,
								json: {
									data: obj,
									source: 'wxmini',
									appVersion: '1.0.0',
									userid: uni.getStorageSync('userid') || 1,
									time,
									relationid: relationid,
									geometrygouhui: [],
									geometry: {
										valuetype: 'geometry',
										geotype: 'WKT',
										data: `SRID=4326;POINT(${this.$store.state.location.longitude} ${this.$store.state.location.latitude})`
									}
								}
							},
							sourcejson: this.formdata
						})
					})

				} else {
					//没有选择动物arr2，比如检疫登记
					let obj = {}
					if (this.modal1flg) {
						obj.jianyizhuangtai = {
							key: '检疫状态',
							value: '检疫异常',
							controltype: 0
						}
					}
					arr2.map((item) => {
						item.fields.map((jtem, j) => {
							if (Array.isArray(jtem)) {
								jtem.map((ktem, k) => {
									obj[ktem.field] = {
										key: ktem.name,
										value: ktem.value,
										controltype: 0
									};
								});
							} else {
								let value = '';
								if (jtem.field) {
									if (jtem.datatype == 'digit' || jtem.datatype == 'number' || jtem
										.datatype == 'varchar' || jtem.datatype == 'labelsum' || jtem
										.datatype == 'textarea' || jtem
										.datatype == "codetable" || jtem.datatype ==
										'img') {
										value = jtem.value;
									}
									if (jtem.code) {
										obj[jtem.field] = {
											key: jtem.name,
											value,
											controltype: 0,
											code: jtem.code
										};
									} else {
										obj[jtem.field] = {
											key: jtem.name,
											value,
											controltype: 0
										};
									}
								}
							}
						});
					})
					arr_final.push({
						service: 'fromService',
						data: {
							formid: this.formid,
							isUp: 2,
							location: {
								Address: ''
							},
							time,
							userid: 1,
							json: {
								data: obj,
								source: 'wxmini',
								appVersion: '1.0.0',
								userid: 1,
								time,
								relationid: this.relationid,
								geometrygouhui: [],
								geometry: {
									valuetype: 'geometry',
									geotype: 'WKT',
									data: `SRID=4326;POINT(${this.$store.state.location.longitude} ${this.$store.state.location.latitude})`
								}
							}
						},
						sourcejson: this.formdata
					})
				}
				console.log(arr_final)
				return arr_final
			},
			//点击页面底部按钮
			btnclick(data) {
				let _self = this
				//点击之后弹框
				if (data.clickedtype) {
					if (data.clickedtype == 1) {
						let arr = _self.getparams()
						if (!arr[0].data.json.data.xianchangyingxiang.value.length) {
							uni.showToast({
								title: '至少拍一张照片',
								icon: 'none'
							})
							return
						}
						_self.modal1flg = true
					}
				}
				//点击之后保存表单，并且跳转
				else {
					if (data.controleng == 'JianYiZhengChang') {
						let arr = _self.getparams()
						if (!arr[0].data.json.data.xianchangyingxiang.value.length) {
							uni.showToast({
								title: '至少拍一张照片',
								icon: 'none'
							})
							return
						}
						saveForm(arr).then((res) => {
							if (res.data.code == 0) {
								uni.navigateTo({
									url: data.clickedurl + '&relationid=' + res.data.data[0]
								})

							}
						})
					} else if (data.controleng == 'add') {
						let arr = _self.getparams()
						saveForm(arr).then((res) => {
							if (res.data.code == 0) {
								getWorkTotal({
									formid: _self.formid,
									dataids: res.data.data.join()
								}).then((res1) => {
									if (res1.data.code == 0) {
										if (res1.data.data.data || res1.data.data.draft) {
											_self.modal2data = res1.data.data
											_self.modal2flg = true

										} else {
											uni.navigateBack({
												delta: _self.onetimeid ? 1 : 2
											})
										}
									}
								})
								uni.removeStorage({
									key: 'selectcode'
								})

							}
						})
					} else if (data.controleng == 'del') {
						uni.showModal({
							content: '删除后将不可恢复，确定删除吗？',
							success(res) {
								if (res.confirm) {
									_self.delconfirm()
								}
							}
						})
					}
				}
			},
			delconfirm() {
				delFormByOnetimeId({
					id: this.onetimeid,
					formid: this.formid
				}).then((res) => {
					if (res.data.code == 0) {
						uni.showToast({
							title: '删除成功'
						})
						setTimeout(() => {
							uni.navigateBack()
						}, 2000)
					}
				})
			}
		}
	};
</script>

<style lang="less">
	page {
		background: #f5f5f5;
	}

	.generalform {
		padding: 20rpx 20rpx 180rpx;

		.form-itemblock {
			padding: 20rpx;
			background: #fff;
			margin-bottom: 40rpx;
			border-radius: 20rpx;
			position: relative;

			.deleteicon {
				position: absolute;
				right: 20rpx;
				top: 20rpx;
				color: red;
				width: 40rpx;
				height: 40rpx;
				z-index: 99;
			}

			.block-title {
				color: #000;
				position: relative;
				margin-bottom: 20rpx;

				&::before {
					content: '';
					display: block;
					position: absolute;
					left: -10rpx;
					top: 8rpx;
					width: 6rpx;
					height: 24rpx;
					background: #3D71E7;
				}
			}

			.fields-item {
				margin-bottom: 20rpx;
				width: 100%;

				.detail {
					width: 100%;
				}

				&:last-child {
					margin-bottom: 0;
				}

				.fields-name {
					margin-right: 16rpx;
					flex-shrink: 0;
					min-width: 80rpx;
				}

				.fields-value {
					border: 1px solid rgba(0, 150, 136, 0.3);
					padding: 0 10rpx;
				}

				.msgbtn {
					color: #3D71E7;
				}

				.noimg-box {
					width: 100%;
					height: 240rpx;
					border: 1px dashed #999;
					color: #999;

					.noimg {
						background: url('../../static/imgs/noimg.png') no-repeat;
						background-size: 100% 100%;
						width: 146rpx;
						height: 100rpx;
						margin-bottom: 20rpx;
					}
				}

				.imgnum-delete {
					background: #F8822D;
					border-radius: 40rpx;
					padding: 5rpx 30rpx;
					font-size: 22rpx;
					top: -50rpx;
					color: #fff;
					right: 20rpx;
					position: absolute;
				}

				.imgnum-add {
					background: #F8822D;
					border-radius: 40rpx;
					padding: 5rpx 30rpx;
					font-size: 22rpx;
					top: -50rpx;
					color: #fff;
					right: 140rpx;
					position: absolute;
				}

				.imgnum-info {
					position: absolute;
					bottom: 20rpx;
					right: 20rpx;
					border-radius: 40rpx;
					background: rgba(#000, 0.5);
					color: #fff;
					padding: 5rpx 20rpx;
				}

				.noitem-box {
					width: 100%;
					height: 80rpx;
					border: 1px dashed #009688;
					color: #009688;
				}

				.u-swiper {
					flex: 1;
				}

				.linkbox-item {
					flex: 1;
				}

				.radio-box {
					width: 100%;

					.radio-item {
						border: 1px solid #009688;
						padding: 20rpx;

						.radio-itemname {
							margin-right: 20rpx;
						}

						.radio-nochecked {
							width: 30rpx;
							height: 30rpx;
							background: url('../../static/imgs/nochecked.png');
							background-size: 100% 100%;
						}

						.radio-checked {
							width: 30rpx;
							height: 30rpx;
							background: url('../../static/imgs/checked.png');
							background-size: 100% 100%;
						}
					}
				}
			}
		}

		// .foot {
		// 	position: fixed;
		// 	height: 160rpx;
		// 	width: 100%;
		// 	z-index: 99;
		// 	background: #fff;
		// 	left: 0;
		// 	bottom: 0;

		// 	.btn-item {
		// 		flex: 1;
		// 		height: 80rpx;
		// 		line-height: 80rpx;
		// 		color: #fff;
		// 		background: #009688;
		// 		border-radius: 40rpx;
		// 		text-align: center;
		// 		margin: 0 40rpx;
		// 	}
		// }
		.foot {
			position: fixed;
			bottom: 40rpx;
			left: 0;
			width: 100%;

			.cancel-btn {
				width: 25%;
				text-align: center;
				color: #3D71E7;
				background: #E1EAFF;
				margin-right: 4%;
				margin-left: 3%;
				border-radius: 40rpx;
				height: 80rpx;
				line-height: 80rpx;
			}

			.confirm-btn {
				width: 65%;
				text-align: center;
				color: #fff;
				background: #3D71E7;
				border-radius: 40rpx;
				height: 80rpx;
				line-height: 80rpx;
			}
		}
	}
</style>
