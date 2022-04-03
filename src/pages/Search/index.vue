<template>
  <div>
    <!-- 商品分类三级列表 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread (面包屑) -->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="removeTradeMark">×</i>
            </li>
            <!-- 平台属性面包屑 -->
            <li class="with-x" v-for="(attr, index) in searchParams.props" :key="index">
              {{ attr.split(":")[1] }}
              <i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector (选择器) -->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details (详情) -->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 价格结构 -->
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a href="#">
                    综合&nbsp;
                    <span
                      v-show="isOne"
                      class="iconfont"
                      :class="{ 'icon-arrowup': isAsc, 'icon-arrowdown': isDesc }"
                    ></span>
                  </a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a href="#">
                    价格&nbsp;
                    <span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{ 'icon-arrowup': isAsc, 'icon-arrowdown': isDesc }"
                    ></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>&nbsp;&nbsp;
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html">{{ good.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">
                      已有
                      <span>2000</span>人评价
                    </i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                    >加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector';
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'Search',
  data() {
    return {
      searchParams: {
        //一级分类的ID
        category1Id: "",
        //二级分类的ID
        category2Id: "",
        //三级分类的ID
        category3Id: "",
        //分类的名字
        categoryName: "",
        //搜索关键字
        keyword: "",
        //排序
        order: "1:desc",
        //分页器用的:代表的是当前是第几页
        pageNo: 1,
        //代表的是每一个展示数据的个数
        pageSize: 10,
        //平台售卖商品的属性参数
        props: [],
        //品牌
        trademark: ""
      }
    }
  },
  components: {
    SearchSelector
  },
  beforeMount() {
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$store.dispatch('getSearchList', this.searchParams)
    },
    //删除分类的名字
    removeCategoryName() {
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      //再次发起Ajax请求
      this.getData();
      //地址栏也需更改,进行路由跳转(现在的路由跳转只是跳转到自己这里)
      if (this.$route.params) {
        //如果路径中含有params参数时不应该全部删除,路由跳转时需要带着
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    //删除关键字
    removeKeyword() {
      this.searchParams.keyword = undefined,
        //再次发送请求
        this.getData()
      //通知兄弟组件Header清除关键字
      this.$bus.$emit('clear')
      //地址栏也需更改,进行路由跳转(现在的路由跳转只是跳转到自己这里)
      if (this.$route.query) {
        //如果路径中含有params参数时不应该全部删除,路由跳转时需要带着
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    //自定义事件回调
    trademarkInfo(brand) {
      this.searchParams.trademark = `${brand.tmId}:${brand.tmName}`;
      //再次发起Ajax请求
      this.getData();
    },
    //删除品牌信息
    removeTradeMark() {
      this.searchParams.trademark = undefined;
      //再次发起Ajax请求
      this.getData();
    },
    //收集平台属性
    attrInfo(attr, attrValue) {
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      if (this.searchParams.props.indexOf(props) == -1) this.searchParams.props.push(props)
      //再次发起Ajax请求
      this.getData();
    },
    //删除平台属性
    removeAttr(index) {
      this.searchParams.props.splice(index, 1)
      //再次发起Ajax请求
      this.getData();
    },
    //排序操作
    changeOrder(flag) {
      //获取到最开始的状态
      let originOrder = this.searchParams.order
      let originFlag = originOrder.split(":")[0];
      let originSort = originOrder.split(":")[1];
      //准备一个新的order属性
      let newOrder = "";
      //判定的是多次点击的是不是同一个按钮
      if (flag == originFlag) {
        newOrder = `${originFlag}:${originSort == 'desc' ? "asc" : "desc"}`
      } else {
        //点击的不是同一个按钮
        newOrder = `${flag}:${"desc"}`
      }
      this.searchParams.order = newOrder;
      //再次发起Ajax请求
      this.getData();
    },
    //自定义事件(获取当前页码)
    getPageNo(getPageNo) {
      //修改参数
      this.searchParams.pageNo = getPageNo;
      //再次发起Ajax请求
      this.getData();
    }
  },
  computed: {
    ...mapGetters(["attrsList", "trademarkList", "goodsList"]),
    ...mapState({ total: state => state.search.searchList.total }),
    isOne() {
      return this.searchParams.order.indexOf('1') !== -1
    },
    isTwo() {
      return this.searchParams.order.indexOf('2') !== -1
    },
    isAsc() {
      return this.searchParams.order.indexOf('asc') !== -1
    },
    isDesc() {
      return this.searchParams.order.indexOf('desc') !== -1
    }
  },
  watch: {
    //监听路由的信息是否发生变化,如果发生变化,再次发起请求
    $route(newValue, oldValue) {
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      //分类名字与关键字不用清理,因为每一次路由发生变化的时候,都会给他赋予新的数据
      this.searchParams.category1Id = '';
      this.searchParams.category2Id = '';
      this.searchParams.category3Id = '';
      //再次发起Ajax请求
      this.getData();
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>