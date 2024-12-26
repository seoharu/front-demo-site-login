"use strict";(self["webpackChunkwsd04"]=self["webpackChunkwsd04"]||[]).push([[328],{2778:function(e,a,t){t.d(a,{in:function(){return i}});t(1454);var l=t(4373);const n=()=>{console.log("전체 환경변수:",{VUE_APP_TMDB_API_KEY:"",VUE_APP_KAKAO_CLIENT_ID:"62d8d2b7a9ff8462f7a5cf0d3a60dee3",NODE_ENV:"production",BASE_URL:"/front-demo-site-login/"});const e="";if(console.log("환경변수 전체:","production"),console.log("TMDB API KEY:",e),!e)throw new Error("TMDB API 키가 환경 변수에 설정되지 않았습니다.");return e},r=l.A.create({baseURL:"https://api.themoviedb.org/3",params:{language:"ko-KR"}});r.interceptors.request.use((e=>(e.params={...e.params,api_key:n()},e)),(e=>Promise.reject(e)));const s=e=>{throw e.response&&console.error("API 에러:",e.response.data),e},i={async getMovies(e=1,a={}){try{const{sort_by:t="popularity.desc",year:l,genre:n,vote_average:s}=a,i={page:e,sort_by:t,...l&&{primary_release_year:l},...n&&{with_genres:n},...s&&{"vote_average.gte":s}};return await r.get("/discover/movie",{params:i})}catch(t){return s(t)}},async getMovieDetails(e){if(!e)throw new Error("영화 ID가 필요합니다.");try{const a=await r.get(`/movie/${e}`,{params:{append_to_response:"videos,credits,similar,images"}});return a.data}catch(a){return s(a)}},async getMovieCredits(e){if(!e)throw new Error("영화 ID가 필요합니다.");try{const a=await r.get(`/movie/${e}/credits`);return a.data}catch(a){return s(a)}},async getPopularMovies(e=1){try{return await r.get("/movie/popular",{params:{page:e}})}catch(a){return s(a)}},async getNowPlayingMovies(e=1){try{return await r.get("/movie/now_playing",{params:{page:e}})}catch(a){return s(a)}},async getTopRatedMovies(e=1){try{return await r.get("/movie/top_rated",{params:{page:e}})}catch(a){return s(a)}},async getUpcomingMovies(e=1){try{return await r.get("/movie/upcoming",{params:{page:e}})}catch(a){return s(a)}},async getMovieRatings(){try{const e=await this.getMovies(1,{sort_by:"vote_average.desc"});return e.data.results.map((e=>e.vote_average))}catch(e){return s(e)}},async getGenres(){try{const e=await r.get("/genre/movie/list");return e.data.genres}catch(e){return console.error("장르 목록 가져오기 실패:",e),o}},async getSimilarMovies(e){if(!e)throw new Error("영화 ID가 필요합니다.");try{const a=await r.get(`/movie/${e}/similar`);return a.data}catch(a){return s(a)}}},o=[{id:28,name:"액션"},{id:12,name:"모험"},{id:16,name:"애니메이션"},{id:35,name:"코미디"},{id:80,name:"범죄"},{id:99,name:"다큐멘터리"},{id:18,name:"드라마"},{id:10751,name:"가족"},{id:14,name:"판타지"},{id:36,name:"역사"},{id:27,name:"공포"},{id:10402,name:"음악"},{id:9648,name:"미스터리"},{id:10749,name:"로맨스"},{id:878,name:"SF"},{id:10770,name:"TV 영화"},{id:53,name:"스릴러"},{id:10752,name:"전쟁"},{id:37,name:"서부"}];a.Ay=i},6800:function(e,a,t){t.r(a),t.d(a,{default:function(){return ie}});var l=t(6768),n=t(4232),r=t(144);t(8992),t(4520);const s={genre:null,rating:null,language:null,year:null,sort:"popularity.desc"};function i(){const e=(0,r.KR)({...s}),a=(a,t)=>{e.value[a]=t},t=()=>{e.value={...s}},n=a=>a.filter((a=>{if(null!==e.value.genre&&!a.genre_ids.includes(e.value.genre))return!1;if(null!==e.value.rating){const t=a.vote_average;if(t<e.value.rating.min||t>e.value.rating.max)return!1}if(null!==e.value.year){const t=a.release_date?new Date(a.release_date).getFullYear():null;if(t!==e.value.year)return!1}return null===e.value.language||""===e.value.language||a.original_language===e.value.language})),i=a=>{const[t,l]=e.value.sort.split("."),n="desc"===l?-1:1;return[...a].sort(((e,a)=>{let l,r;switch(t){case"popularity":l=e.popularity??0,r=a.popularity??0;break;case"vote_average":l=e.vote_average??0,r=a.vote_average??0;break;case"release_date":l=e.release_date?new Date(e.release_date).getTime():0,r=a.release_date?new Date(a.release_date).getTime():0;break;case"revenue":l=e.revenue??0,r=a.revenue??0;break;default:return 0}return(l-r)*n}))},o=(0,l.EW)((()=>{const a={language:"ko-KR",sort_by:e.value.sort};return null!==e.value.genre&&(a.with_genres=e.value.genre),null!==e.value.rating&&(a["vote_average.gte"]=e.value.rating.min,a["vote_average.lte"]=e.value.rating.max),null!==e.value.language&&""!==e.value.language&&(a.with_original_language=e.value.language),null!==e.value.year&&(a.year=e.value.year),a}));return{filters:e,updateFilter:a,resetFilters:t,filterMovies:n,sortMovies:i,getFilterParams:o}}var o=t(1005),u=t(6885),c=t(8552),g=t(2778),v=t(5130);const d={class:"filter-group"},h=["value"];function p(e,a,t,r,s,i){return(0,l.uX)(),(0,l.CE)("div",d,[a[3]||(a[3]=(0,l.Lk)("label",{class:"filter-label"},[(0,l.Lk)("i",{class:"fas fa-film"}),(0,l.Lk)("span",{class:"label-text"},"장르")],-1)),(0,l.bo)((0,l.Lk)("select",{"onUpdate:modelValue":a[0]||(a[0]=e=>s.selectedGenre=e),onChange:a[1]||(a[1]=(...e)=>i.handleChange&&i.handleChange(...e)),class:"filter-select"},[a[2]||(a[2]=(0,l.Lk)("option",{value:""},"전체 장르",-1)),((0,l.uX)(!0),(0,l.CE)(l.FK,null,(0,l.pI)(s.genres,(e=>((0,l.uX)(),(0,l.CE)("option",{key:e.id,value:e.id},(0,n.v_)(e.name),9,h)))),128))],544),[[v.u1,s.selectedGenre]])])}var m={name:"GenreFilter",emits:["change"],data(){return{genres:[],selectedGenre:""}},methods:{async loadGenres(){try{const e=await g.Ay.getGenres();this.genres=e}catch(e){console.error("장르 목록 로딩 실패:",e)}},handleChange(){console.log("Selected genre:",this.selectedGenre),this.$emit("change",this.selectedGenre)},reset(){this.selectedGenre="",this.handleChange()}},async created(){await this.loadGenres()}},y=t(1241);const f=(0,y.A)(m,[["render",p],["__scopeId","data-v-a9c06e20"]]);var _=f;const k={class:"filter-group"},b=["value"];function w(e,a,t,r,s,i){return(0,l.uX)(),(0,l.CE)("div",k,[a[3]||(a[3]=(0,l.Lk)("label",{class:"filter-label"},[(0,l.Lk)("i",{class:"fas fa-star"}),(0,l.Lk)("span",{class:"label-text"},"최소 평점")],-1)),(0,l.bo)((0,l.Lk)("select",{"onUpdate:modelValue":a[0]||(a[0]=e=>s.selectedRating=e),onChange:a[1]||(a[1]=(...e)=>i.handleChange&&i.handleChange(...e)),class:"filter-select"},[a[2]||(a[2]=(0,l.Lk)("option",{value:""},"전체 별점",-1)),((0,l.uX)(!0),(0,l.CE)(l.FK,null,(0,l.pI)(s.ratingOptions,(e=>((0,l.uX)(),(0,l.CE)("option",{key:e.value,value:e.value},(0,n.v_)(e.label),9,b)))),128))],544),[[v.u1,s.selectedRating]])])}var C={name:"RatingFilter",emits:["change"],data(){return{selectedRating:"",ratingOptions:[{value:9,label:"9점 이상"},{value:8,label:"8점 이상"},{value:7,label:"7점 이상"},{value:6,label:"6점 이상"},{value:5,label:"5점 이상"},{value:0,label:"5점 미만"}],loading:!1,error:null}},methods:{async loadRatings(){this.loading=!0;try{const e=await g["in"].getMovieRatings();console.log("Loaded ratings:",e)}catch(e){console.error("별점 로드 실패:",e),this.error=e}finally{this.loading=!1}},handleChange(){console.log("Selected rating:",this.selectedRating),0===this.selectedRating?this.$emit("change",{min:0,max:5}):this.$emit("change",{min:this.selectedRating,max:10})},reset(){this.selectedRating="",this.handleChange()}},async created(){await this.loadRatings()}};const L=(0,y.A)(C,[["render",w],["__scopeId","data-v-09c52966"]]);var R=L;const E={class:"filter-group"},F=["value"];function A(e,a,t,r,s,i){return(0,l.uX)(),(0,l.CE)("div",E,[a[3]||(a[3]=(0,l.Lk)("label",{class:"filter-label"},[(0,l.Lk)("i",{class:"fas fa-language"}),(0,l.Lk)("span",{class:"label-text"},"언어")],-1)),(0,l.bo)((0,l.Lk)("select",{"onUpdate:modelValue":a[0]||(a[0]=a=>e.selectedLanguage=a),onChange:a[1]||(a[1]=(...a)=>e.handleLanguageChange&&e.handleLanguageChange(...a)),class:"filter-select"},[a[2]||(a[2]=(0,l.Lk)("option",{value:""},"전체 언어",-1)),((0,l.uX)(!0),(0,l.CE)(l.FK,null,(0,l.pI)(e.languages,(e=>((0,l.uX)(),(0,l.CE)("option",{key:e.code,value:e.code},(0,n.v_)(e.name)+" ("+(0,n.v_)(e.code.toUpperCase())+") ",9,F)))),128))],544),[[v.u1,e.selectedLanguage]])])}var K=(0,l.pM)({name:"LanguageFilter",emits:["change"],data(){return{selectedLanguage:"",languages:[{code:"ko",name:"한국어",nativeName:"한국어"},{code:"en",name:"영어",nativeName:"English"},{code:"ja",name:"일본어",nativeName:"日本語"},{code:"zh",name:"중국어",nativeName:"中文"},{code:"es",name:"스페인어",nativeName:"Español"},{code:"fr",name:"프랑스어",nativeName:"Français"},{code:"de",name:"독일어",nativeName:"Deutsch"},{code:"it",name:"이탈리아어",nativeName:"Italiano"}]}},methods:{handleLanguageChange(){const e=""===this.selectedLanguage?null:this.selectedLanguage;this.$emit("change",e)},reset(){this.selectedLanguage="",this.handleLanguageChange()}}});const M=(0,y.A)(K,[["render",A],["__scopeId","data-v-90d360ac"]]);var I=M;const X={class:"filter-group"},Y={label:"최근"},x=["value"],S={label:"과거"},D=["value"];function P(e,a,t,r,s,i){return(0,l.uX)(),(0,l.CE)("div",X,[a[3]||(a[3]=(0,l.Lk)("label",{class:"filter-label"},[(0,l.Lk)("i",{class:"fas fa-calendar-alt"}),(0,l.Lk)("span",{class:"label-text"},"개봉년도")],-1)),(0,l.bo)((0,l.Lk)("select",{"onUpdate:modelValue":a[0]||(a[0]=a=>e.selectedYear=a),onChange:a[1]||(a[1]=(...a)=>e.handleYearChange&&e.handleYearChange(...a)),class:"filter-select"},[a[2]||(a[2]=(0,l.Lk)("option",{value:""},"전체 년도",-1)),(0,l.Lk)("optgroup",Y,[((0,l.uX)(!0),(0,l.CE)(l.FK,null,(0,l.pI)(e.recentYears,(e=>((0,l.uX)(),(0,l.CE)("option",{key:e,value:e},(0,n.v_)(e)+"년 ",9,x)))),128))]),(0,l.Lk)("optgroup",S,[((0,l.uX)(!0),(0,l.CE)(l.FK,null,(0,l.pI)(e.pastYears,(e=>((0,l.uX)(),(0,l.CE)("option",{key:e,value:e},(0,n.v_)(e)+"년 ",9,D)))),128))])],544),[[v.u1,e.selectedYear]])])}var N=(0,l.pM)({name:"YearFilter",data(){const e=(new Date).getFullYear(),a=10,t=10,l=Array.from({length:a},((a,t)=>e-t)),n=Array.from({length:t},((t,l)=>e-a-10*l));return{selectedYear:"",recentYears:l,pastYears:n}},emits:["change"],methods:{handleYearChange(){const e=""===this.selectedYear?null:Number(this.selectedYear);this.$emit("change",e)},reset(){this.selectedYear="",this.handleYearChange()}}});const T=(0,y.A)(N,[["render",P],["__scopeId","data-v-051ac99f"]]);var U=T;const V={class:"filter-group"},G=["value"],$=["value"];function W(e,a,t,r,s,i){return(0,l.uX)(),(0,l.CE)("div",V,[a[2]||(a[2]=(0,l.Lk)("label",{class:"filter-label"},[(0,l.Lk)("i",{class:"fas fa-sort-amount-down"}),(0,l.Lk)("span",{class:"label-text"},"정렬")],-1)),(0,l.Lk)("select",{value:e.selectedSort,onChange:a[0]||(a[0]=(...a)=>e.handleSortChange&&e.handleSortChange(...a)),class:"filter-select"},[a[1]||(a[1]=(0,l.Lk)("option",{value:"popularity.desc"},"기본",-1)),((0,l.uX)(!0),(0,l.CE)(l.FK,null,(0,l.pI)(e.sortOptions,(e=>((0,l.uX)(),(0,l.CE)("option",{key:e.value,value:e.value},(0,n.v_)(e.label),9,$)))),128))],40,G)])}var O=(0,l.pM)({name:"SortFilter",props:{selectedSort:{type:String,default:"popularity.desc"}},emits:{change:e=>!0},setup(e,{emit:a}){const t=[{value:"popularity.desc",label:"인기도 높은순"},{value:"popularity.asc",label:"인기도 낮은순"},{value:"vote_average.desc",label:"평점 높은순"},{value:"vote_average.asc",label:"평점 낮은순"},{value:"release_date.desc",label:"최신순"},{value:"release_date.asc",label:"오래된순"}],l=e=>{const t=e.target;a("change",t.value)},n=()=>{a("change","popularity.desc")};return{sortOptions:t,handleSortChange:l,reset:n}}});const B=(0,y.A)(O,[["render",W],["__scopeId","data-v-b6a589cc"]]);var j=B,q=t(7941),Q=t(1586);const z={class:"filter-movies-container min-h-screen bg-gray-900"},H={class:"filters-container"},J={class:"view-toggle-section"},Z={key:0},ee={key:0,class:"table-view"},ae={key:1,class:"no-results"},te={class:"suggestions mt-8"},le={class:"genre-chips"},ne=["onClick"];var re={__name:"SearchPage",setup(e){const{filters:a,updateFilter:t,resetFilters:s,filterMovies:v,sortMovies:d,getFilterParams:h}=i(),p=(0,r.KR)(localStorage.getItem("preferredViewType")||"table"),m=(0,r.KR)([]),y=(0,r.KR)(1),f=(0,r.KR)(1),k=(0,r.KR)(!1),b=(0,r.KR)(!1),w=(0,r.KR)("영화를 검색하는 중..."),C=(0,r.KR)(null),L=(0,r.KR)(null),E=(0,r.KR)(null),F=(0,r.KR)(null),A=(0,r.KR)(null),K=(0,r.KR)(!1),M=(0,r.KR)(0),X=(0,l.EW)((()=>Math.max(.7,1-M.value/500))),Y=(0,l.EW)((()=>Math.min(.95,.7+M.value/500)));let x;const S=()=>{x&&window.cancelAnimationFrame(x),x=window.requestAnimationFrame((()=>{M.value=window.scrollY,K.value=window.scrollY>50}))};(0,l.sV)((()=>{window.addEventListener("scroll",S,{passive:!0})})),(0,l.hi)((()=>{window.removeEventListener("scroll",S)}));const D=(0,l.EW)((()=>{const e=v(m.value);return d(e)})),P=(0,l.EW)((()=>y.value<f.value)),N=async(e=1,a=!1)=>{try{a||(k.value=!0,w.value="영화 정보를 불러오는 중..."),b.value=a;const t=await g.Ay.getMovies(e,h.value);t?.data&&(m.value=1===e?t.data.results:[...m.value,...t.data.results],f.value=t.data.total_pages)}catch(t){console.error("영화 로딩 실패:",t)}finally{k.value=!1,b.value=!1}},T=async e=>{e!==y.value&&(y.value=e,w.value=`${e}페이지로 이동 중...`,await N(e),window.scrollTo({top:0,behavior:"smooth"}))},V=async()=>{P.value&&!b.value&&(w.value="추가 영화를 불러오는 중...",y.value++,await N(y.value,!0))},G=async()=>{k.value=!0,w.value="필터를 초기화하는 중...",C.value?.reset(),L.value?.reset(),E.value?.reset(),F.value?.reset(),A.value?.reset(),s(),y.value=1,await N(1)},$=e=>{p.value=e,localStorage.setItem("preferredViewType",e)},W=e=>{},O=async e=>{try{k.value=!0,w.value="영화 상세 정보를 불러오는 중...";await g.Ay.getMovieDetails(e)}catch(a){console.error("영화 상세 정보 로드 실패:",a)}finally{k.value=!1}};return(0,l.wB)(a,(()=>{N(1)}),{deep:!0}),(e,s)=>((0,l.uX)(),(0,l.CE)("div",z,[(0,l.bF)(q.A),(0,l.bF)(Q.A,{loading:k.value,message:w.value,type:"full"},null,8,["loading","message"]),(0,l.Lk)("div",{class:(0,n.C4)(["search-page",{"opacity-50":k.value}])},[(0,l.Lk)("div",{class:(0,n.C4)(["filters-section",{"filters-scrolled":K.value}]),style:(0,n.Tr)({opacity:X.value,backgroundColor:`rgba(17, 17, 17, ${Y.value})`})},[(0,l.Lk)("div",H,[(0,l.bF)(_,{ref_key:"genreFilterRef",ref:C,"selected-genre":(0,r.R1)(a).genre,onChange:s[0]||(s[0]=e=>(0,r.R1)(t)("genre",e))},null,8,["selected-genre"]),(0,l.bF)(R,{ref_key:"ratingFilterRef",ref:L,"selected-rating":(0,r.R1)(a).rating,onChange:s[1]||(s[1]=e=>(0,r.R1)(t)("rating",e))},null,8,["selected-rating"]),(0,l.bF)(I,{ref_key:"languageFilterRef",ref:E,"selected-language":(0,r.R1)(a).language,onChange:s[2]||(s[2]=e=>(0,r.R1)(t)("language",e))},null,8,["selected-language"]),(0,l.bF)(U,{ref_key:"yearFilterRef",ref:F,"selected-year":(0,r.R1)(a).year,onChange:s[3]||(s[3]=e=>(0,r.R1)(t)("year",e))},null,8,["selected-year"]),(0,l.bF)(j,{ref_key:"sortFilterRef",ref:A,"selected-sort":(0,r.R1)(a).sort,onChange:s[4]||(s[4]=e=>(0,r.R1)(t)("sort",e))},null,8,["selected-sort"]),(0,l.Lk)("button",{class:"reset-btn",onClick:G},s[5]||(s[5]=[(0,l.Lk)("i",{class:"fas fa-undo"},null,-1),(0,l.eW)(" 필터 초기화 ")]))]),(0,l.Lk)("div",J,[(0,l.bF)(c.A,{"initial-view":p.value,onViewTypeChanged:$},null,8,["initial-view"])])],6),!k.value&&D.value.length>0?((0,l.uX)(),(0,l.CE)("div",Z,["table"===p.value?((0,l.uX)(),(0,l.CE)("div",ee,[(0,l.bF)(o.A,{movies:D.value,"current-page":y.value,"total-pages":f.value,onPageChanged:T,onWishlistUpdated:W,onShowDetail:O},null,8,["movies","current-page","total-pages"])])):((0,l.uX)(),(0,l.Wv)(u.A,{key:1,movies:D.value,loading:b.value,"has-more":P.value,onLoadMore:V,onWishlistUpdated:W,onShowDetail:O},null,8,["movies","loading","has-more"]))])):(0,l.Q3)("",!0),k.value||0!==D.value.length?(0,l.Q3)("",!0):((0,l.uX)(),(0,l.CE)("div",ae,[s[7]||(s[7]=(0,l.Lk)("div",{class:"empty-state"},[(0,l.Lk)("i",{class:"fas fa-search text-4xl text-gray-400 mb-4"}),(0,l.Lk)("p",{class:"text-white text-lg"},"원하는 영화를 찾아보세요"),(0,l.Lk)("p",{class:"text-gray-400 text-sm mt-2"},"장르, 평점, 언어 등으로 필터링할 수 있습니다")],-1)),(0,l.Lk)("div",te,[s[6]||(s[6]=(0,l.Lk)("h3",{class:"text-white text-xl mb-4"},"추천 장르",-1)),(0,l.Lk)("div",le,[((0,l.uX)(),(0,l.CE)(l.FK,null,(0,l.pI)(["액션","코미디","로맨스","SF"],(e=>(0,l.Lk)("button",{key:e,class:"genre-chip",onClick:()=>(0,r.R1)(t)("genre",e)},(0,n.v_)(e),9,ne))),64))])])]))],2)]))}};const se=(0,y.A)(re,[["__scopeId","data-v-0d346ebc"]]);var ie=se}}]);
//# sourceMappingURL=328.9c810530.js.map