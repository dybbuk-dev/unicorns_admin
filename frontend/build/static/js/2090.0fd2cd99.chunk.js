"use strict";(self.webpackChunkCrypto_Unicorns_Admin=self.webpackChunkCrypto_Unicorns_Admin||[]).push([[2090],{56148:function(e,n,r){var a=r(29439),t=r(47313),l=r(43270),i=r(49384),o=r(72686),s=r(42735),u=r(53649),d=r(46417);function c(e){var n=e.autoComplete,r=e.autoFocus,c=e.disabled,m=e.endAdornment,f=e.externalErrorMessage,h=e.forceValue,g=(e.fullWidth,e.hint),v=(e.id,e.label),p=e.margin,x=e.name,Z=e.placeholder,b=e.readOnly,j=e.required,C=e.shrink,y=e.size,k=e.startAdornment,V=e.type,q=e.value,S=e.variant,I=(0,l.Gc)(),A=I.control.defaultValuesRef,O=I.errors,E=I.formState,F=E.touched,P=E.isSubmitted,w=I.getValues,z=I.register,D=I.setValue,B=A.current||{},L=w(x),_=(0,t.useState)(L||q||B[x]||""),M=(0,a.Z)(_,2),R=M[0],T=M[1];h&&D(x,q,{shouldValidate:!1,shouldDirty:!0}),(0,t.useEffect)((function(){z({name:x})}),[z,x]),(0,t.useEffect)((function(){h&&T(q)}),[q]);var W=i.Z.errorMessage(x,O,F,P,f);return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(s.Z,{id:x,name:x,type:V,label:v,required:j,onChange:function(n){h||D(x,n.target.value,{shouldValidate:!1,shouldDirty:!0}),T(n.target.value),e.onChange&&e.onChange(n.target.value)},onBlur:function(n){e.onBlur&&e.onBlur(n)},margin:p,fullWidth:!0,variant:S,size:y,placeholder:Z||void 0,autoFocus:r||void 0,autoComplete:n||void 0,InputLabelProps:{shrink:C},error:Boolean(W),helperText:g,InputProps:{startAdornment:k,endAdornment:m},inputProps:{name:x,readOnly:b},disabled:c,value:R}),W&&(0,d.jsx)(o.Z,{mt:.75,children:(0,d.jsx)(u.Z,{component:"div",variant:"caption",color:"error",fontWeight:"regular",children:W})})]})}c.defaultProps={forceValue:!1,readOnly:!1,required:!1,type:"text"},n.Z=c},37943:function(e,n,r){var a=r(1413),t=r(29439),l=r(47313),i=r(10499),o=r(43270),s=r(49384),u=r(84511),d=r(62829),c=r(42735),m=r(72686),f=r(53649),h=r(46417),g=(0,u.D)();function v(e){var n=e.label,r=e.name,u=(e.hint,e.externalErrorMessage),v=e.variant,p=e.required,x=(e.placeholder,e.isClearable,e.notFoundContent),Z=void 0===x?(0,i.ag)("autocomplete.noOptions"):x,b=e.size,j=e.shrink,C=e.margin,y=(0,o.Gc)(),k=y.register,V=y.errors,q=y.formState,S=q.touched,I=q.isSubmitted,A=y.setValue,O=y.watch,E=s.Z.errorMessage(r,V,S,I,u);(0,l.useEffect)((function(){k({name:r})}),[k,r]);var F=O(r),P=function(){return F&&F.length?F.map((function(e){return{value:e,label:e}})):[]},w=l.useState(P()),z=(0,t.Z)(w,2),D=z[0],B=z[1];return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(d.Z,{multiple:!0,isOptionEqualToValue:function(e,n){return e.value===n.value},value:P(),options:D,selectOnFocus:!0,clearOnBlur:!0,onChange:function(n,a){!function(n){if(!n||!n.length)return A(r,null,{shouldValidate:!1,shouldDirty:!0}),void(e.onChange&&e.onChange(null));var a=n.map((function(e){return e.value})).join(",").split(",");A(r,a,{shouldValidate:!1,shouldDirty:!0}),e.onChange&&e.onChange(a)}(a),B(a)},renderInput:function(e){return(0,h.jsx)(c.Z,(0,a.Z)((0,a.Z)({},e),{},{margin:C,variant:v,size:b,required:p,InputLabelProps:{shrink:j},label:n}))},filterOptions:function(e,n){var r=g(e,n).map((function(e){return{value:e.value,label:e.value}}));return n.inputValue.split(/[ ]*,[ ]*/g).forEach((function(e){""===e.trim()||r.some((function(n){return n.value===e}))||r.push({value:e,label:'Add "'.concat(e,'"')})})),r},loadingText:(0,i.ag)("autocomplete.loading"),noOptionsText:Z}),E&&(0,h.jsx)(m.Z,{mt:.75,children:(0,h.jsx)(f.Z,{component:"div",variant:"caption",color:"error",fontWeight:"regular",children:E})})]})}v.defaultProps={required:!1,isClearable:!0},n.Z=v},92090:function(e,n,r){r.r(n),r.d(n,{default:function(){return P}});var a=r(73428),t=r(47313),l=r(45788),i=r(10499),o=r(3538),s=r(541),u=r(47921),d=r(72686),c=r(53649),m=r(1413),f=r(29439),h=r(9019),g=r(11198),v=r(83121),p=r(49930),x=r(43270),Z=r(56148),b=r(5544),j=r(37943),C=r(68160),y=r(36834),k=r(89994),V=r(63442),q=r(67357),S=r(64760),I=r(60357),A=r(46417),O=y.Ry().shape({email:k.Z.email((0,i.ag)("user.fields.email")),roles:k.Z.stringArray((0,i.ag)("user.fields.roles"),{required:!0,min:1})}),E=y.Ry().shape({emails:y.IX().label((0,i.ag)("user.fields.emails")).of(y.Z_().transform((function(e,n){return""===n?null:e})).email((0,i.ag)("user.validations.email")).label((0,i.ag)("user.fields.email")).max(255).required()).required().min(1),roles:k.Z.stringArray((0,i.ag)("user.fields.roles"),{required:!0,min:1})});var F=function(e){var n=(0,I.Q)().sidenavColor,r=e.single,a=e.saveLoading,l=e.modal,o=e.single?O:E,s=(0,t.useState)((function(){return{emails:[],email:"",roles:[]}})),u=(0,f.Z)(s,1)[0],d=(0,x.cI)({resolver:(0,q.X)(o),mode:"onSubmit",defaultValues:u}),c=function(n){var r=Object.assign({},n);r.email&&(r.emails=[r.email],delete r.email),e.onSubmit(null,r)};return(0,A.jsx)(C.Z,{children:(0,A.jsx)(x.RV,(0,m.Z)((0,m.Z)({},d),{},{children:(0,A.jsxs)("form",{onSubmit:d.handleSubmit(c),children:[(0,A.jsxs)(h.ZP,{spacing:2,container:!0,children:[(0,A.jsx)(h.ZP,{item:!0,lg:7,md:8,sm:12,xs:12,children:r?(0,A.jsx)(Z.Z,{name:"email",label:(0,i.ag)("user.fields.email"),required:!0,variant:"standard",autoFocus:!0,shrink:!0}):(0,A.jsx)(j.Z,{name:"emails",label:(0,i.ag)("user.fields.emails"),notFoundContent:(0,i.ag)("user.new.emailsHint"),variant:"standard",required:!0,shrink:!0})}),(0,A.jsx)(h.ZP,{item:!0,lg:7,md:8,sm:12,xs:12,children:(0,A.jsx)(b.Z,{name:"roles",label:(0,i.ag)("user.fields.roles"),required:!0,options:V.Z.roles.map((function(e){return{value:e,label:(0,i.ag)("roles.".concat(e,".label"))}})),variant:"standard",mode:"multiple",shrink:!0})})]}),(0,A.jsxs)(C.A,{style:{flexDirection:l?"row-reverse":void 0},children:[(0,A.jsx)(S.Z,{variant:"gradient",color:n,disabled:a,type:"submit",onClick:d.handleSubmit(c),startIcon:(0,A.jsx)(v.Z,{}),size:"small",children:(0,i.ag)("common.save")}),(0,A.jsx)(S.Z,{variant:"outlined",color:n,disabled:a,onClick:function(){Object.keys(u).forEach((function(e){d.setValue(e,u[e])}))},type:"button",startIcon:(0,A.jsx)(p.Z,{}),size:"small",children:(0,i.ag)("common.reset")}),e.onCancel?(0,A.jsx)(S.Z,{variant:"outlined",color:n,disabled:a,onClick:function(){return e.onCancel()},type:"button",startIcon:(0,A.jsx)(g.Z,{}),size:"small",children:(0,i.ag)("common.cancel")}):null]})]})}))})};var P=function(e){var n=(0,l.I0)(),r=(0,l.v9)(u.Z.selectSaveLoading);return(0,t.useEffect)((function(){n(s.Z.doInit())}),[n]),(0,A.jsx)(A.Fragment,{children:(0,A.jsx)(a.Z,{children:(0,A.jsxs)(d.Z,{px:3,py:3,children:[(0,A.jsx)(d.Z,{pb:3,display:"flex",justifyContent:"space-between",alignItems:"flex-start",children:(0,A.jsx)(c.Z,{variant:"h3",children:(0,i.ag)("user.new.title")})}),(0,A.jsx)(F,{saveLoading:r,onSubmit:function(e,r){n(s.Z.doAdd(r))},onCancel:function(){return(0,o.s1)().push("/user")}})]})})})}}}]);