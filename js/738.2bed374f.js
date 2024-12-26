"use strict";(self["webpackChunkwsd04"]=self["webpackChunkwsd04"]||[]).push([[738],{8362:function(e,r,o){o.d(r,{A:function(){return i}});o(4114),o(8992),o(2577),o(7550);var a=o(144),t=o(6768);const s=()=>{const e=e=>{if(!e)return{isValid:!1,error:"이메일을 입력해주세요."};const r=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;return r.test(e)?{isValid:!0}:{isValid:!1,error:"유효한 이메일 형식이 아닙니다."}},r=e=>e?e.length<20?{isValid:!1,error:"유효한 TMDB API 키를 입력해주세요."}:{isValid:!0}:{isValid:!1,error:"비밀번호를 입력해주세요."},o=(e,r)=>r?e!==r?{isValid:!1,error:"비밀번호가 일치하지 않습니다."}:{isValid:!0}:{isValid:!1,error:"비밀번호 확인을 입력해주세요."},a=e=>e?{isValid:!0}:{isValid:!1,error:"이용약관에 동의해주세요."},t=o=>{const a=e(o.email);if(!a.isValid)return a;const t=r(o.password);return t.isValid?{isValid:!0}:t},s=t=>{const s=e(t.email);if(!s.isValid)return s;const l=r(t.password);if(!l.isValid)return l;const n=o(t.password,t.confirmPassword);if(!n.isValid)return n;const i=a(t.agreement);return i.isValid?{isValid:!0}:i};return{validateEmail:e,validatePassword:r,validatePasswordConfirm:o,validateAgreement:a,validateLoginForm:t,validateRegisterForm:s}};var l=o(1387),n=o(6819);const i=()=>{const e=(0,l.rd)(),{validateLoginForm:r,validateRegisterForm:o}=s(),i=(0,a.KR)(null),c=(0,a.KR)(null),u=(0,a.KR)(!1),d=(0,a.KR)(!1),g=(0,a.KR)(!1),m=(0,a.KR)(null),p=(0,t.EW)((()=>null!==i.value)),k=(e,r)=>{try{localStorage.setItem(e,JSON.stringify(r))}catch(m){console.error(`Error writing ${e} to localStorage:`,m)}},h=async e=>{try{const r=await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${e}&language=ko-KR&page=1`);return r.ok}catch{return!1}},f=e=>{if(!navigator.onLine){const e="인터넷 연결을 확인해주세요.";return m.value=e,{success:!1,error:e}}if(e instanceof Error&&"TimeoutError"===e.name){const e="서버 응답 시간이 초과되었습니다. 다시 시도해주세요.";return m.value=e,{success:!1,error:e}}console.error("API Error:",e);const r=e instanceof Error?e.message:"서비스 연결에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.";return m.value=r,{success:!1,error:r}},w=async()=>{g.value=!0,m.value=null;try{console.log("카카오 로그인 시작");const r=await n.a.login();if(console.log("카카오 인증 응답:",r),!r)throw new Error("카카오 로그인 인증 실패");const o=await n.a.getProfile();if(console.log("카카오 프로필 응답:",o),!o||!o.properties||!o.properties.nickname)throw new Error("카카오 프로필 정보가 올바르지 않습니다.");const a=o.properties.nickname.trim();if(!a)throw new Error("카카오 닉네임을 가져올 수 없습니다.");if(!o||!o.properties||!o.properties.nickname)throw new Error("카카오 사용자 정보를 가져올 수 없습니다");const t=o;return c.value=t,i.value=a,k("kakaoUser",o),k("currentUser",a),i.value=t.properties.nickname,console.log("카카오 로그인 사용자 정보:",{ID:o.id,"닉네임":a,"프로필사진":o.properties.profile_image,"연결시간":o.connected_at,"계정정보":t.kakao_account}),e.push("/"),{success:!0}}catch(m){console.error("Kakao login error:",m);const r=m instanceof Error?m.message:"카카오 로그인 중 오류 발생";return{success:!1,error:r}}finally{g.value=!1}},v=async e=>{try{const r=o(e);if(!r.isValid)return{success:!1,error:r.error};const a=await h(e.password);if(!a)return{success:!1,error:"유효하지 않은 TMDB API 키입니다."};const t=JSON.parse(localStorage.getItem("users")||"[]");return t.some((r=>r.id===e.email))?{success:!1,error:"이미 등록된 이메일입니다."}:(t.push({id:e.email,password:e.password}),localStorage.setItem("users",JSON.stringify(t)),{success:!0})}catch(m){return console.error("Register error:",m),{success:!1,error:"회원가입 중 오류가 발생했습니다."}}},A=async e=>{try{const o=r(e);if(!o.isValid)return{success:!1,error:o.error};const a=JSON.parse(localStorage.getItem("users")||"[]"),t=a.find((r=>r.id===e.email&&r.password===e.password));if(!t)return{success:!1,error:"이메일 또는 비밀번호가 일치하지 않습니다."};const s=await h(e.password);return s?(localStorage.setItem("TMDb-Key",e.password),localStorage.setItem("currentUser",e.email),e.rememberMe&&localStorage.setItem("keepLoggedIn","true"),i.value=e.email,{success:!0}):{success:!1,error:"유효하지 않은 TMDB API 키입니다."}}catch(m){return console.error("Login error:",m),{success:!1,error:"로그인 중 오류가 발생했습니다."}}},b=async()=>{try{window.Kakao?.Auth?.getAccessToken()&&await window.Kakao.Auth.logout(),i.value=null,c.value=null,localStorage.removeItem("kakaoUser"),localStorage.removeItem("TMDb-Key"),localStorage.removeItem("currentUser"),localStorage.removeItem("keepLoggedIn"),d.value=!1,e.push("/signin")}catch(m){throw console.error("Logout error:",m),f(m),m}},y=async()=>{try{const e=localStorage.getItem("kakaoUser");if(console.log("savedKakaoUser:",e),window.Kakao?.Auth?.getAccessToken())try{const e=await n.a.getProfile();console.log("Fresh profile info:",e);const r=e;if(e?.properties?.nickname){const o={id:e.id,connected_at:e.connected_at,properties:{nickname:e.properties.nickname,profile_image:e.properties.profile_image},kakao_account:{profile_nickname_needs_agreement:!1,profile_image_needs_agreement:!1,profile:{nickname:r.properties.nickname,profile_image_url:r.properties.profile_image||"",thumbnail_image_url:r.properties.thumbnail_image||""},email:r.kakao_account?.email||""}};return r.value=o,i.value=o.properties.nickname,k("kakaoUser",o),k("currentUser",o.properties.nickname),console.log("Updated current user:",i.value),!0}}catch(m){console.error("Failed to fetch profile:",m),await b()}else e&&(console.log("Token missing but saved user exists, logging out"),await b());const r=localStorage.getItem("currentUser"),o=localStorage.getItem("keepLoggedIn");return!(!r||"true"!==o)&&(i.value=r,!0)}catch(m){return console.error("Auth check error:",m),!1}},V=()=>{u.value=window.scrollY>50},C=()=>{d.value=!d.value},I=()=>{d.value=!1},K=[{name:"홈",path:"/"},{name:"대세 콘텐츠",path:"/popular"},{name:"찾아보기",path:"/search"},{name:"내가 찜한 콘텐츠",path:"/wishlist"}],S=()=>p.value;return{currentUser:i,kakaoUserInfo:c,isLoggedIn:p,loading:g,error:m,login:A,register:v,kakaoLogin:w,logout:b,checkAuth:y,requireAuth:S,isScrolled:u,isMobileMenuOpen:d,handleScroll:V,toggleMobileMenu:C,closeMobileMenu:I,menuItems:K}}},6819:function(e,r,o){o.d(r,{a:function(){return a}});const a={init(){try{if(!window.Kakao)return console.error("Kakao SDK not loaded"),!1;if(!window.Kakao.isInitialized()){let e="62d8d2b7a9ff8462f7a5cf0d3a60dee3";if(e||(e=(void 0).VUE_APP_KAKAO_CLIENT_ID),console.log("Using Kakao Client ID:",e),!e)return console.error("Kakao Client ID not found in environment variables"),!1;window.Kakao.init(e),console.log("Kakao SDK initialized")}return!0}catch(e){return console.error("Kakao init error:",e),!1}},async login(){if(!this.init())throw new Error("Kakao SDK initialization failed");try{const e=await new Promise(((e,r)=>{window.Kakao.Auth.login({success:async o=>{console.log("Login success:",o);try{const r=await this.getProfile();e({auth:o,profile:r})}catch(a){r(new Error("프로필 정보 조회 실패: "+a.message))}},fail:e=>{console.error("Login failed:",e),r(new Error(e.message||"카카오 로그인 실패"))},scope:"profile_nickname, profile_image"})}));return e}catch(e){throw console.error("Login error:",e),e}},async getProfile(){if(!window.Kakao?.Auth?.getAccessToken())throw new Error("로그인이 필요합니다");try{const e=await window.Kakao.API.request({url:"/v2/user/me"});if(console.log("Raw profile response:",e),!e||"object"!==typeof e)throw new Error("Invalid response format");if(!e.properties||!e.properties.nickname)throw console.error("Properties or nickname missing:",e),new Error("프로필 정보가 불완전합니다");return{id:e.id,connected_at:e.connected_at,properties:{nickname:e.properties.nickname,profile_image:e.properties.profile_image},kakao_account:e.kakao_account}}catch(e){throw console.error("Get profile error:",e),e}},async logout(){if(window.Kakao?.Auth?.getAccessToken())try{await window.Kakao.Auth.logout(),console.log("Logged out successfully")}catch(e){throw console.error("Logout error:",e),e}}}},738:function(e,r,o){o.r(r),o.d(r,{default:function(){return z}});o(4114);var a=o(6768),t=o(4232),s=o(144),l=o(1387),n=o(5130),i="data:image/png;base64,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";const c={class:"form-group"},u=["value","type","placeholder"],d={key:0,class:"error-message"};var g=(0,a.pM)({__name:"FormInput",props:{modelValue:{},type:{},placeholder:{},error:{}},emits:["update:modelValue"],setup(e){return(e,r)=>((0,a.uX)(),(0,a.CE)("div",c,[(0,a.Lk)("input",{value:e.modelValue,type:e.type,placeholder:e.placeholder,class:(0,t.C4)(["form-input",{error:e.error}]),onInput:r[0]||(r[0]=r=>e.$emit("update:modelValue",r.target.value))},null,42,u),e.error?((0,a.uX)(),(0,a.CE)("span",d,(0,t.v_)(e.error),1)):(0,a.Q3)("",!0)]))}}),m=o(1241);const p=(0,m.A)(g,[["__scopeId","data-v-50c0e313"]]);var k=p;const h=["disabled"],f={key:0},w={key:1,class:"loading-spinner"};var v=(0,a.pM)({__name:"FormButton",props:{loading:{type:Boolean}},setup(e){return(e,r)=>((0,a.uX)(),(0,a.CE)("button",{class:(0,t.C4)(["form-button",{loading:e.loading}]),disabled:e.loading},[e.loading?((0,a.uX)(),(0,a.CE)("span",w)):((0,a.uX)(),(0,a.CE)("span",f,[(0,a.RG)(e.$slots,"default")]))],10,h))}});const A=(0,m.A)(v,[["__scopeId","data-v-3ea18e82"]]);var b=A;const y={class:"form-checkbox"},V={class:"checkbox-label"},C=["checked"],I={class:"label-text"};var K=(0,a.pM)({__name:"FormCheckbox",props:{modelValue:{type:Boolean},label:{}},emits:["update:modelValue"],setup(e){return(e,r)=>((0,a.uX)(),(0,a.CE)("div",y,[(0,a.Lk)("label",V,[(0,a.Lk)("input",{type:"checkbox",checked:e.modelValue,class:"checkbox-input",onChange:r[0]||(r[0]=r=>e.$emit("update:modelValue",r.target.checked))},null,40,C),(0,a.Lk)("span",I,(0,t.v_)(e.label),1)])]))}});const S=(0,m.A)(K,[["__scopeId","data-v-00bb90eb"]]);var L=S,T=o(8362),E=o(657),U=o(6819);const F=(0,E.nY)("auth",{state:()=>({user:null,isAuthenticated:!1,loading:!1,error:null}),actions:{async loginWithKakao(){try{this.loading=!0,this.error=null;const e=await U.a.login(),r=await U.a.getProfile();return this.user={id:r.id,nickname:r.nickname,profileImage:r.profileImage,email:r.email},this.isAuthenticated=!0,localStorage.setItem("kakaoToken",e.access_token),localStorage.setItem("userInfo",JSON.stringify(this.user)),!0}catch(e){return this.error=e.message||"로그인에 실패했습니다.",console.error("Kakao login failed:",e),!1}finally{this.loading=!1}},async logout(){try{return this.loading=!0,this.error=null,await U.a.logout(),this.user=null,this.isAuthenticated=!1,localStorage.removeItem("kakaoToken"),localStorage.removeItem("userInfo"),!0}catch(e){return this.error=e.message||"로그아웃에 실패했습니다.",console.error("Logout failed:",e),!1}finally{this.loading=!1}},initializeAuth(){try{const e=localStorage.getItem("userInfo"),r=localStorage.getItem("kakaoToken");e&&r&&(this.user=JSON.parse(e),this.isAuthenticated=!0,U.a.restoreSession())}catch(e){console.error("Failed to initialize auth:",e),this.user=null,this.isAuthenticated=!1,localStorage.removeItem("kakaoToken"),localStorage.removeItem("userInfo")}},clearError(){this.error=null}},getters:{userProfile:e=>e.user,isLoading:e=>e.loading,errorMessage:e=>e.error}}),P={class:"kakao-login-wrapper"},B=["disabled"];var M=(0,a.pM)({__name:"LoginForm",emits:["toggle-auth","login-success"],setup(e,{emit:r}){const{login:o}=(0,T.A)(),t=F(),l=r,c=(0,s.KR)(!1),u=(0,s.KR)(!1),d=(0,s.Kh)({email:"",password:"",rememberMe:!1}),g=(0,s.Kh)({email:"",password:""}),m=async()=>{try{c.value=!0,g.email="",g.password="";const e=await o(d);e.success?l("login-success"):e.error?.includes("이메일")?g.email=e.error:g.password=e.error}finally{c.value=!1}},p=async()=>{try{u.value=!0;const e=await t.loginWithKakao();e&&l("login-success")}catch(e){console.error("Kakao login failed:",e)}finally{u.value=!1}};return(e,r)=>((0,a.uX)(),(0,a.CE)("form",{class:"auth-form",onSubmit:(0,n.D$)(m,["prevent"])},[r[6]||(r[6]=(0,a.Lk)("h2",null,"로그인",-1)),(0,a.bF)(k,{modelValue:d.email,"onUpdate:modelValue":r[0]||(r[0]=e=>d.email=e),type:"email",placeholder:"이메일",error:g.email},null,8,["modelValue","error"]),(0,a.bF)(k,{modelValue:d.password,"onUpdate:modelValue":r[1]||(r[1]=e=>d.password=e),type:"password",placeholder:"비밀번호 (TMDB API Key)",error:g.password},null,8,["modelValue","error"]),(0,a.bF)(L,{modelValue:d.rememberMe,"onUpdate:modelValue":r[2]||(r[2]=e=>d.rememberMe=e),label:"로그인 상태 유지"},null,8,["modelValue"]),(0,a.bF)(b,{loading:c.value},{default:(0,a.k6)((()=>r[4]||(r[4]=[(0,a.eW)(" 로그인 ")]))),_:1},8,["loading"]),r[7]||(r[7]=(0,a.Lk)("div",{class:"divider"},[(0,a.Lk)("span",null,"또는")],-1)),(0,a.Lk)("div",P,[(0,a.Lk)("button",{type:"button",class:"kakao-login-button",onClick:p,disabled:u.value},r[5]||(r[5]=[(0,a.Lk)("img",{src:i,alt:"카카오 로그인"},null,-1)]),8,B)]),(0,a.Lk)("button",{type:"button",class:"toggle-button",onClick:r[3]||(r[3]=r=>e.$emit("toggle-auth"))}," 계정이 없으신가요? 회원가입 ")],32))}});const X=(0,m.A)(M,[["__scopeId","data-v-0f60131f"]]);var R=X,J=(o(8992),o(3949),(0,a.pM)({__name:"RegisterForm",emits:["toggle-auth","register-success"],setup(e,{emit:r}){const{register:o}=(0,T.A)(),t=r,l=(0,s.KR)(!1),i=(0,s.Kh)({email:"",password:"",confirmPassword:"",agreement:!1}),c=(0,s.Kh)({email:"",password:"",confirmPassword:"",agreement:""}),u=async()=>{try{l.value=!0,Object.keys(c).forEach((e=>{c[e]=""}));const e=await o(i);e.success?t("register-success"):e.error?.includes("이메일")?c.email=e.error:e.error?.includes("비밀번호 확인")?c.confirmPassword=e.error:e.error?.includes("비밀번호")?c.password=e.error:e.error?.includes("약관")?c.agreement=e.error:c.password=e.error}finally{l.value=!1}};return(e,r)=>((0,a.uX)(),(0,a.CE)("form",{class:"auth-form",onSubmit:(0,n.D$)(u,["prevent"])},[r[6]||(r[6]=(0,a.Lk)("h2",null,"회원가입",-1)),(0,a.bF)(k,{modelValue:i.email,"onUpdate:modelValue":r[0]||(r[0]=e=>i.email=e),type:"email",placeholder:"이메일",error:c.email},null,8,["modelValue","error"]),(0,a.bF)(k,{modelValue:i.password,"onUpdate:modelValue":r[1]||(r[1]=e=>i.password=e),type:"password",placeholder:"비밀번호 (TMDB API Key)",error:c.password},null,8,["modelValue","error"]),(0,a.bF)(k,{modelValue:i.confirmPassword,"onUpdate:modelValue":r[2]||(r[2]=e=>i.confirmPassword=e),type:"password",placeholder:"비밀번호 확인",error:c.confirmPassword},null,8,["modelValue","error"]),(0,a.bF)(L,{modelValue:i.agreement,"onUpdate:modelValue":r[3]||(r[3]=e=>i.agreement=e),label:"이용약관에 동의합니다",error:c.agreement},null,8,["modelValue","error"]),(0,a.bF)(b,{loading:l.value},{default:(0,a.k6)((()=>r[5]||(r[5]=[(0,a.eW)(" 회원가입 ")]))),_:1},8,["loading"]),(0,a.Lk)("button",{type:"button",class:"toggle-button",onClick:r[4]||(r[4]=r=>e.$emit("toggle-auth"))}," 이미 계정이 있으신가요? 로그인 ")],32))}}));const N=(0,m.A)(J,[["__scopeId","data-v-d256de14"]]);var O=N;const x={class:"auth-container"},D={class:"card-front"},H={class:"card-back"};var Q=(0,a.pM)({name:"SignIn",__name:"AuthPage",setup(e){const r=(0,l.rd)(),o=(0,s.KR)(!1),n=()=>{o.value=!o.value},i=()=>{r.push("/")},c=()=>{o.value=!1};return(e,r)=>((0,a.uX)(),(0,a.CE)("div",x,[(0,a.Lk)("div",{class:(0,t.C4)(["auth-card",{flipped:o.value}])},[(0,a.Lk)("div",D,[r[0]||(r[0]=(0,a.Lk)("div",{class:"logo-section"},[(0,a.Lk)("h1",null,"MOVIES"),(0,a.Lk)("p",null,"Welcome back to movies")],-1)),o.value?(0,a.Q3)("",!0):((0,a.uX)(),(0,a.Wv)(R,{key:0,onToggleAuth:n,onLoginSuccess:i}))]),(0,a.Lk)("div",H,[r[1]||(r[1]=(0,a.Lk)("div",{class:"logo-section"},[(0,a.Lk)("h1",null,"JOIN US"),(0,a.Lk)("p",null,"Create your account")],-1)),o.value?((0,a.uX)(),(0,a.Wv)(O,{key:0,onToggleAuth:n,onRegisterSuccess:c})):(0,a.Q3)("",!0)])],2)]))}});const _=(0,m.A)(Q,[["__scopeId","data-v-14a49a08"]]);var z=_}}]);
//# sourceMappingURL=738.2bed374f.js.map