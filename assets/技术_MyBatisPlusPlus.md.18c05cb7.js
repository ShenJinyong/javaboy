import{_ as s,c as n,o as a,a as l}from"./app.f2d0f4fd.js";const d=JSON.parse('{"title":"MyBatisPlusPlus","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u6839\u636E\u591A\u4E2A\u5B57\u6BB5\u8054\u5408\u4E3B\u952E\u589E\u5220\u6539\u67E5","slug":"\u6839\u636E\u591A\u4E2A\u5B57\u6BB5\u8054\u5408\u4E3B\u952E\u589E\u5220\u6539\u67E5","link":"#\u6839\u636E\u591A\u4E2A\u5B57\u6BB5\u8054\u5408\u4E3B\u952E\u589E\u5220\u6539\u67E5","children":[]},{"level":2,"title":"\u4F18\u5316\u5206\u9875\u63D2\u4EF6\u5B9E\u73B0\u5728\u4E0D\u5206\u9875\u65F6\u8FDB\u884C\u6392\u5E8F\u64CD\u4F5C","slug":"\u4F18\u5316\u5206\u9875\u63D2\u4EF6\u5B9E\u73B0\u5728\u4E0D\u5206\u9875\u65F6\u8FDB\u884C\u6392\u5E8F\u64CD\u4F5C","link":"#\u4F18\u5316\u5206\u9875\u63D2\u4EF6\u5B9E\u73B0\u5728\u4E0D\u5206\u9875\u65F6\u8FDB\u884C\u6392\u5E8F\u64CD\u4F5C","children":[]},{"level":2,"title":"\u81EA\u52A8\u586B\u5145\u4F18\u5316\u529F\u80FD & \u81EA\u52A8\u626B\u63CFEntity\u7C7B\u6784\u5EFAResultMap\u529F\u80FD","slug":"\u81EA\u52A8\u586B\u5145\u4F18\u5316\u529F\u80FD-\u81EA\u52A8\u626B\u63CFentity\u7C7B\u6784\u5EFAresultmap\u529F\u80FD","link":"#\u81EA\u52A8\u586B\u5145\u4F18\u5316\u529F\u80FD-\u81EA\u52A8\u626B\u63CFentity\u7C7B\u6784\u5EFAresultmap\u529F\u80FD","children":[]},{"level":2,"title":"\u5E38\u89C1\u95EE\u9898\u8BF4\u660E","slug":"\u5E38\u89C1\u95EE\u9898\u8BF4\u660E","link":"#\u5E38\u89C1\u95EE\u9898\u8BF4\u660E","children":[]},{"level":2,"title":"\u517C\u5BB9\u6027\u8BF4\u660E","slug":"\u517C\u5BB9\u6027\u8BF4\u660E","link":"#\u517C\u5BB9\u6027\u8BF4\u660E","children":[]}],"relativePath":"\u6280\u672F/MyBatisPlusPlus.md","lastUpdated":1678164647000}'),p={name:"\u6280\u672F/MyBatisPlusPlus.md"},e=l(`<h1 id="mybatisplusplus" tabindex="-1">MyBatisPlusPlus <a class="header-anchor" href="#mybatisplusplus" aria-hidden="true">#</a></h1><p>gitee\u5730\u5740\uFF1A<code>https://gitee.com/jeffreyning/mybatisplus-plus</code></p><p>github\u5730\u5740\uFF1A<code>https://github.com/jeffreyning/mybatisplus-plus</code></p><p>\u8BF4\u660E\uFF1Amybatisplus-plus\u5BF9mybatisplus\u7684\u4E00\u4E9B\u529F\u80FD\u8865\u5145</p><h2 id="\u6839\u636E\u591A\u4E2A\u5B57\u6BB5\u8054\u5408\u4E3B\u952E\u589E\u5220\u6539\u67E5" tabindex="-1">\u6839\u636E\u591A\u4E2A\u5B57\u6BB5\u8054\u5408\u4E3B\u952E\u589E\u5220\u6539\u67E5 <a class="header-anchor" href="#\u6839\u636E\u591A\u4E2A\u5B57\u6BB5\u8054\u5408\u4E3B\u952E\u589E\u5220\u6539\u67E5" aria-hidden="true">#</a></h2><p>\u539F\u751Fmybatisplus\u53EA\u652F\u6301\u4E00\u4E2A\u4E3B\u952E\uFF0Cmpp\u652F\u6301\u591A\u4E2A\u5B57\u6BB5\u8054\u5408\u4E3B\u952E\uFF08\u590D\u5408\u4E3B\u952E\uFF09\u589E\u5220\u6539\u67E5\uFF0Cmapper\u9700\u8981\u7EE7\u627FMppBaseMapper \u5B9E\u4F53\u7C7B\u4E2D\u8054\u5408\u4E3B\u952E\u7684\u5B57\u6BB5\u9700\u8981\u7528@MppMultiId\u6CE8\u89E3\u4FEE\u9970 \u5982\u679C\u9700\u8981\u5728service\u4F7F\u7528\u591A\u4E3B\u952E\u76F8\u5173\u64CD\u4F5C\u5305\u62ECsaveOrUpdateByMultiId\u548C\u6279\u91CF\u64CD\u4F5CupdateBatchByMultiId\u548CsaveOrUpdateBatchByMultiId\uFF0C\u53EF\u4EE5\u76F4\u63A5\u7EE7\u627FIMppService\u63A5\u53E3</p><h2 id="\u4F18\u5316\u5206\u9875\u63D2\u4EF6\u5B9E\u73B0\u5728\u4E0D\u5206\u9875\u65F6\u8FDB\u884C\u6392\u5E8F\u64CD\u4F5C" tabindex="-1">\u4F18\u5316\u5206\u9875\u63D2\u4EF6\u5B9E\u73B0\u5728\u4E0D\u5206\u9875\u65F6\u8FDB\u884C\u6392\u5E8F\u64CD\u4F5C <a class="header-anchor" href="#\u4F18\u5316\u5206\u9875\u63D2\u4EF6\u5B9E\u73B0\u5728\u4E0D\u5206\u9875\u65F6\u8FDB\u884C\u6392\u5E8F\u64CD\u4F5C" aria-hidden="true">#</a></h2><p>\u539F\u751Fmybatisplus\u5206\u9875\u4E0E\u6392\u5E8F\u662F\u7ED1\u5B9A\u7684\uFF0Cmpp\u4F18\u5316\u4E86\u5206\u9875\u63D2\u4EF6\uFF0C\u4F7F\u7528MppPaginationInterceptor\u63D2\u4EF6 \u5728\u4E0D\u5206\u9875\u7684\u60C5\u51B5\u4E0B\u652F\u6301\u6392\u5E8F\u64CD\u4F5C page\u53C2\u6570size\u8BBE\u7F6E\u4E3A-1\u53EF\u5B9E\u73B0\u4E0D\u5206\u9875\u53D6\u5168\u91CF\u6570\u636E\uFF0C\u540C\u65F6\u8BBE\u7F6EOrderItem\u53EF\u4EE5\u5B9E\u73B0\u6392\u5E8F</p><h2 id="\u81EA\u52A8\u586B\u5145\u4F18\u5316\u529F\u80FD-\u81EA\u52A8\u626B\u63CFentity\u7C7B\u6784\u5EFAresultmap\u529F\u80FD" tabindex="-1">\u81EA\u52A8\u586B\u5145\u4F18\u5316\u529F\u80FD &amp; \u81EA\u52A8\u626B\u63CFEntity\u7C7B\u6784\u5EFAResultMap\u529F\u80FD <a class="header-anchor" href="#\u81EA\u52A8\u586B\u5145\u4F18\u5316\u529F\u80FD-\u81EA\u52A8\u626B\u63CFentity\u7C7B\u6784\u5EFAresultmap\u529F\u80FD" aria-hidden="true">#</a></h2><p>\u539F\u751Fmybatisplus\u53EA\u80FD\u505A%s+1\u548Cnow\u4E24\u79CD\u586B\u5145\uFF0Cmybatisplus-plus\u5728\u63D2\u5165\u6216\u66F4\u65B0\u65F6\u5BF9\u6307\u5B9A\u5B57\u6BB5\u8FDB\u884C\u81EA\u5B9A\u4E49\u590D\u6742sql\u586B\u5145\u3002 \u9700\u8981\u5728\u5B9E\u4F53\u7C7B\u5B57\u6BB5\u4E0A\u7528\u539F\u751F\u6CE8\u89E3@TableField\u8BBE\u7F6Efill=FieldFill.INSERT fill=FieldFill.UPDATE\u6216fill=FieldFill.INSERT_UPDATE\u5426\u5219\u4E0D\u4F1A\u89E6\u53D1\u81EA\u5B9A\u4E49\u586B\u5145 mybatisplus-plus\u4F7F\u7528@InsertFill\u6CE8\u89E3\u89E6\u53D1\u63D2\u5165\u65F6\uFF0C\u6267\u884C\u6CE8\u89E3\u4E2D\u81EA\u5B9A\u4E49\u7684sql\u586B\u5145\u5B9E\u4F53\u7C7B\u5B57\u6BB5 mybatisplus-plus\u4F7F\u7528@UpdateFill\u6CE8\u89E3\u89E6\u53D1\u66F4\u65B0\u65F6\uFF0C\u6267\u884C\u6CE8\u89E3\u4E2D\u81EA\u5B9A\u4E49\u7684sql\u586B\u5145\u5B9E\u4F53\u7C7B\u5B57\u6BB5 \u8FD8\u53EF\u4EE5\u81EA\u52A8\u586B\u5145\u4E3B\u952E\u5B57\u6BB5,\u89E3\u51B3\u539F\u751Fmybatisplus\u4E0D\u652F\u6301\u591A\u4E2A\u4E3B\u952E\u7684\u95EE\u9898 \u4F7F\u7528ColNameUtil.pn\u9759\u6001\u65B9\u6CD5\uFF0C\u83B7\u53D6\u5B9E\u4F53\u7C7B\u4E2D\u8BFB\u53D6\u65B9\u6CD5\u5BF9\u5E94\u7684\u5217\u540D\u79F0</p><p>\u5728xml\u4E2D\u7F16\u5199resultmap\u662F\u4EF6\u5934\u75DB\u7684\u4E8B\uFF0C\u7279\u522B\u662F\u8868\u8FDE\u63A5\u65F6\u8FD4\u56DE\u7684\u5BF9\u8C61\u662F\u591A\u6837\u7684\uFF0C\u5982\u679C\u4E0D\u6309\u7167map\u8FD4\u56DE\uFF0C\u5206\u522B\u5EFAresultmap\u5DE5\u4F5C\u91CF\u4F1A\u7FFB\u500D\u3002 \u4F7F\u7528@AutoMap\u6CE8\u89E3entity\u5B9E\u4F53\u7C7B\uFF0C\u5C31\u53EF\u4EE5\u5728\u5E94\u7528\u542F\u52A8\u65F6\u89E3\u6790\u4F7F\u7528@TableField\u6CE8\u89E3\u7684\u5B57\u6BB5\uFF0C\u81EA\u52A8\u751F\u6210scan.mybatis-plus_xxxx\u4E3Aid\u7684resultMap \u53EF\u4EE5\u5728xml\u4E2D\u76F4\u63A5\u914D\u7F6E\u4F7F\u7528\u8FD9\u4E2AresultMap\u5B9E\u4F8B \u5E76\u4E14\u8FD8\u652F\u6301\u7EE7\u627F\u5173\u7CFB\uFF0C\u626B\u63CF\u5B9E\u4F53\u5B50\u7C7B\u4F1A\u9644\u52A0\u4E0A\u7236\u7C7B\u7684\u5B57\u6BB5\u4FE1\u606F\u4E00\u8D77\u6784\u5EFA\u5B50\u7C7B\u7684resultmap \u5BF9\u4E8E\u5404\u79CD\u8868\u8FDE\u63A5\u5F62\u6210\u7684\u8FD4\u56DE\u5B9E\u4F53\u5BF9\u8C61\uFF0C\u53EF\u4EE5\u901A\u8FC7\u7EE7\u627F\u6765\u751F\u6210\u3002\u901A\u8FC7\u626B\u63CF\u540E\u81EA\u52A8\u6784\u5EFA\u5404\u79CDresultmap\uFF0C\u5728xml\u4E2D\u5F15\u7528\u3002</p><p>\u505A\u8FDE\u8868\u67E5\u8BE2\u65F6\uFF0C\u8F93\u5165\u53C2\u6570\u5F80\u5F80\u4E0D\u662F\u5355\u4E00\u7684\u5B9E\u4F53\u7C7B\uFF0C\u800C\u662F\u91C7\u7528\u66F4\u7075\u6D3B\u7684Map\u5BF9\u8C61\uFF0C \u4F46map\u4E2Dkey\u53C2\u6570\u7684\u540D\u79F0\u5B9A\u4E49\u8FC7\u4E8E\u968F\u4FBF\uFF0C\u53EF\u4EE5\u4F7F\u7528\u63A5\u53E3\u5B9A\u4E49\u5E38\u91CF\u3002\u4F46\u539F\u751Fmybatis\u5728xml\u4E2D\u8C03\u7528\u9759\u6001\u7C7B\u65B9\u6CD5\u548C\u53D8\u91CF\u65F6\u9700\u8981\u586B\u5199\u5B8C\u6574\u7684\u5305\u540D\u4E0D\u5229\u4E8E\u5927\u91CF\u91C7\u7528 \u662F\u5426\u53EF\u4EE5\u50CF\u5728mybatisplus\u4E2D\u4F7F\u7528lambda\u8868\u8FBE\u5F0F\u7FFB\u8BD1entity\u4E2D\u7684\u5217\u540D\u79F0 mpp\u505A\u4E86\u5C01\u88C5\u652F\u6301xml\u7684ognl\u4E2D\u5F15\u5165\u9ED8\u8BA4\u5305\u540D(\u4E3A\u4E86\u517C\u5BB9jdk11 mpp1.7.0\u7684ognl\u9ED8\u8BA4\u5305\u540D\u529F\u80FD\u5DF2\u7ECF\u5220\u9664)\uFF0C\u5E76\u652F\u6301lambda\u5B9A\u4E49\u5217\u540D\u79F0 \u4F8B\u5982xml\u4F7F\u7528\u4EE5\u4E0B\u8BED\u53E5\u5F15\u5165map\u53C2\u6570\u4E2Dcreate_time \u539F\u751F\u65B9\u5F0F</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">#{create_time}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>mpp\u7684\u9ED8\u8BA4\u5305\u540D\u5F15\u7528\u63A5\u53E3\u5E38\u91CF\u65B9\u5F0F(1.7.0\u6B64\u914D\u7F6E\u5DF2\u7ECF\u5220\u9664) \u914D\u7F6E\u6587\u4EF6\u4E2Dmpp.utilBasePath\u53EF\u8BBE\u7F6Eognl\u9ED8\u8BA4\u5305\u540D</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">#{\${@ColInfo@createTime}}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>mpp\u7684lambda\u65B9\u5F0F(1.7.0\u4E2D\u4F7F\u7528@com.MPP@col)</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">#{\${@MPP@col(&quot;TestEntity::getCreateTime&quot;)}}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>\u4ECE\u4E2D\u592E\u5E93\u5F15\u5165jar</strong></p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">    &lt;dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;groupId&gt;com.github.jeffreyning&lt;/groupId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;artifactId&gt;mybatisplus-plus&lt;/artifactId&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;version&gt;1.5.1-RELEASE&lt;/version&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/dependency&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>\u5728\u5B9E\u4F53\u7C7B\u4E0A\u8BBE\u7F6E@KeySequence\uFF0C\u5728\u63D2\u5165\u65F6\u5BF9id\u5B57\u6BB5\u81EA\u52A8\u586B\u5145\u590D\u6742\u8BA1\u7B97\u503C</strong></p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">@KeySequence(&quot;select lpad(max(seqno)+3,10,&#39;0&#39;) from test&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">@TableName(value = &quot;test&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">public class TestEntity {</span></span>
<span class="line"><span style="color:#A6ACCD;">    @TableId(value = &quot;id&quot;, type=IdType.INPUT)</span></span>
<span class="line"><span style="color:#A6ACCD;">    private Integer id;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>1.5.1\u7248\u672C\u4E4B\u540E\u9700\u4F7F\u7528@EnableAutoFill\u6CE8\u89E3\u6574\u4F53\u5F00\u542F\u81EA\u52A8\u6CE8\u5165\u529F\u80FD</strong> <strong>\u5728\u5B9E\u4F53\u7C7B\u5B57\u6BB5\u4E0A\u8BBE\u7F6E@InsertFill @UpdateFill\uFF0C\u63D2\u5165\u548C\u66F4\u65B0\u65F6\u4F7F\u7528\u5F53\u524D\u65F6\u95F4\u586B\u5145</strong></p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">    @InsertFill(&quot;select now()&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    @UpdateFill(&quot;select now()&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    @TableField(value=&quot;update_time&quot;,fill=FieldFill.INSERT_UPDATE)</span></span>
<span class="line"><span style="color:#A6ACCD;">    private Date updateTime;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>\u5728\u5B9E\u4F53\u7C7B\u5B57\u6BB5\u4E0A\u8BBE\u7F6E@InsertFill\uFF0C\u5728\u63D2\u5165\u65F6\u5BF9seqno\u5B57\u6BB5\u81EA\u52A8\u586B\u5145\u590D\u6742\u8BA1\u7B97\u503C</strong> \u67E5\u8BE2\u5F53\u524D\u6700\u5927\u7684seqno\u503C\u5E76\u52A03\uFF0C\u8F6C\u6362\u621010\u4F4D\u5B57\u7B26\u4E32\uFF0C\u4E0D\u591F\u4F4D\u6570\u65F6\u75280\u586B\u5145</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">    @TableField(value=&quot;seqno&quot;,fill=FieldFill.INSERT )</span></span>
<span class="line"><span style="color:#A6ACCD;">    @InsertFill(&quot;select lpad(max(seqno)+3,10,&#39;0&#39;) from test&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    private String seqno;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>\u5728\u542F\u52A8\u7C7B\u4E2D\u4F7F\u7528@EnableMPP\u542F\u52A8\u6269\u5C55\u81EA\u5B9A\u4E49\u586B\u5145\u529F\u80FD\u548C\u81EA\u52A8\u521B\u5EFAresultmap\u529F\u80FD</strong> <strong>\u5728\u542F\u52A8\u7C7B\u4E2D\u4F7F\u7528@EnableKeyGen\u542F\u52A8\u4E3B\u952E\u81EA\u5B9A\u4E49\u4E3B\u952E\u586B\u5145\u529F\u80FD</strong> \u6CE8\u610F\u5982\u679C\u81EA\u5DF1\u5B9E\u73B0\u4E86IKeyGenerator\u4F1A\u4E0E@EnableKeyGen\u51B2\u7A81</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">@SpringBootApplication</span></span>
<span class="line"><span style="color:#A6ACCD;">@EnableMPP</span></span>
<span class="line"><span style="color:#A6ACCD;">@EnableKeyGen</span></span>
<span class="line"><span style="color:#A6ACCD;">public class PlusDemoApplication {</span></span>
<span class="line"><span style="color:#A6ACCD;">    public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        SpringApplication.run(PlusDemoApplication.class, args);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>\u5728\u5B9E\u4F53\u7C7B\u4E0A\u4F7F\u7528@AutoMap\u6CE8\u89E3</strong> JoinEntity\u662FTestEntity\u7684\u5B50\u7C7B @TableName(autoResultMap=true) autoResultMap\u5FC5\u987B\u8BBE\u7F6E\u4E3Atrue \u7236\u7C7B\u53EF\u4EE5\u4E0D\u52A0@AutoMap\uFF0C\u7236\u7C7B\u8BBE\u7F6EautoResultMap=true\u65F6mybatisplus\u8D1F\u8D23\u751F\u6210resultmap \u4F46\u539F\u751Fmybatisplus\u751F\u6210\u7684resultmap\u7684id\u4E3Amybatis-plus_xxxx\u6CA1\u6709scan.\u524D\u7F00</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">@AutoMap</span></span>
<span class="line"><span style="color:#A6ACCD;">@TableName(autoResultMap=true)</span></span>
<span class="line"><span style="color:#A6ACCD;">public class JoinEntity extends TestEntity{</span></span>
<span class="line"><span style="color:#A6ACCD;">    @TableField(&quot;some2&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    private String some2;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    public String getSome2() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        return some2;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    public void setSome2(String some2) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.some2 = some2;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public String toString() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        return &quot;JoinEntity{&quot; +</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;some2=&#39;&quot; + some2 + &#39;\\&#39;&#39; +</span></span>
<span class="line"><span style="color:#A6ACCD;">                &#39;}&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>\u914D\u7F6E\u6587\u4EF6\u4E2D\u52A0\u5165\u626B\u63CFentity\u8DEF\u5F84\uFF0C\u591A\u4E2A\u8DEF\u5F84\u7528\u9017\u53F7\u5206\u9694</strong></p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">mpp:</span></span>
<span class="line"><span style="color:#A6ACCD;">  entityBasePath: com.github.jeffreyning.mybatisplus.demo.entity</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>\u914D\u7F6E\u6587\u4EF6\u4E2D\u52A0\u5165ognl\u6267\u884Cjava\u9759\u6001\u65B9\u6CD5\u7684\u7C7B\u52A0\u8F7D\u9ED8\u8BA4\u8DEF\u5F84\uFF0C\u591A\u4E2A\u8DEF\u5F84\u7528\u9017\u53F7\u5206\u9694(1.7.0\u6B64\u914D\u7F6E\u5DF2\u7ECF\u5220\u9664)</strong></p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">mpp:</span></span>
<span class="line"><span style="color:#A6ACCD;">  utilBasePath: com.github.jeffreyning.mybatisplus.demo.common</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>xml\u6587\u4EF6\u4E2D\u5F15\u5165\u81EA\u52A8\u751F\u6210\u7684resultMap &amp; xml\u4E2D\u4F7F\u7528\u7701\u7565\u5305\u540D\u8C03\u7528\u9759\u6001\u65B9\u6CD5\uFF081.7.0\u7701\u7565\u5305\u540D\u5DF2\u7ECF\u5220\u9664\uFF0C\u4F7F\u7528com.MPP\uFF09 &amp; @com.MPP@col\u901A\u8FC7entity\u7684lambda\u8868\u8FBE\u5F0F\u7FFB\u8BD1\u5217\u540D</strong></p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;!DOCTYPE mapper PUBLIC &quot;-//mybatis.org//DTD Mapper 3.0//EN&quot; &quot;http://mybatis.org/dtd/mybatis-3-mapper.dtd&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;mapper namespace=&quot;com.github.jeffreyning.mybatisplus.demo.mapper.TestMapper&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;select id=&quot;queryUseRM&quot; resultMap=&quot;scan.mybatis-plus_JoinEntity&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        select * from test inner join test2 on test.id=test2.refid</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/select&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;select id=&quot;queryUse&quot; resultMap=&quot;scan.mybatis-plus_JoinEntity&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        select * from test inner join test2 on test.id=test2.refid</span></span>
<span class="line"><span style="color:#A6ACCD;">        where test.create_time &lt;![CDATA[ &lt;= ]]&gt; #{\${@com.MPP@col(&quot;TestEntity::getCreateTime&quot;)}}</span></span>
<span class="line"><span style="color:#A6ACCD;">        and test.id=#{\${@com.MPP@col(&quot;TestEntity::getId&quot;)}}</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/select&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/mapper&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>\u63A5\u53E3\u76F4\u63A5\u8FD4\u56DE\u5B9E\u4F8B\u7C7B</strong></p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">@Mapper</span></span>
<span class="line"><span style="color:#A6ACCD;">public interface TestMapper extends BaseMapper&lt;TestEntity&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    public List&lt;JoinEntity&gt; queryUseRM();</span></span>
<span class="line"><span style="color:#A6ACCD;">    public List&lt;JoinEntity&gt; queryUse(Map param);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>\u4F7F\u7528ColNameUtil.pn\u9759\u6001\u65B9\u6CD5\uFF0C\u83B7\u53D6\u5B9E\u4F53\u7C7B\u4E2D\u8BFB\u53D6\u65B9\u6CD5\u5BF9\u5E94\u7684\u5217\u540D\u79F0</strong></p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">       System.out.println(ColNameUtil.pn(TestEntity::getCreateTime));</span></span>
<span class="line"><span style="color:#A6ACCD;">       System.out.println(ColNameUtil.pn(TestEntity::getId));</span></span>
<span class="line"><span style="color:#A6ACCD;">       System.out.println(ColNameUtil.pn(JoinEntity::getSome2));</span></span>
<span class="line"><span style="color:#A6ACCD;">       System.out.println(ColNameUtil.pn(JoinEntity::getUpdateTime));</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>\u6839\u636E\u591A\u4E2A\u5B57\u6BB5\u8054\u5408\u4E3B\u952E\u589E\u5220\u6539\u67E5</strong> \u5728\u5B9E\u4F8B\u7C7B\u6210\u5458\u53D8\u91CF\u4E0A\u4F7F\u7528@MppMultiId\u8868\u660E\u8054\u5408\u4E3B\u952E</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">@TableName(&quot;test07&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">public class Test07Entity {</span></span>
<span class="line"><span style="color:#A6ACCD;">    @MppMultiId</span></span>
<span class="line"><span style="color:#A6ACCD;">    @TableField(value = &quot;k1&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    private Integer k1;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    @MppMultiId</span></span>
<span class="line"><span style="color:#A6ACCD;">    @TableField(value = &quot;k2&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    private String k2;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;">    @TableField(value = &quot;col1&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    private String col1;</span></span>
<span class="line"><span style="color:#A6ACCD;">    @TableField(value = &quot;col2&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    private String col2;    </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>mapper\u9700\u8981\u7EE7\u627FMppBaseMapper</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">@Mapper</span></span>
<span class="line"><span style="color:#A6ACCD;">public interface Test07Mapper extends MppBaseMapper&lt;Test07Entity&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u6839\u636E\u591A\u4E3B\u952E\u589E\u5220\u6539\u67E5</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">    public void testMultiId(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        //id</span></span>
<span class="line"><span style="color:#A6ACCD;">        Test07Entity idEntity=new Test07Entity();</span></span>
<span class="line"><span style="color:#A6ACCD;">        idEntity.setK1(1);</span></span>
<span class="line"><span style="color:#A6ACCD;">        idEntity.setK2(&quot;111&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //del</span></span>
<span class="line"><span style="color:#A6ACCD;">        test07Mapper.deleteByMultiId(idEntity);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //add</span></span>
<span class="line"><span style="color:#A6ACCD;">        test07Mapper.insert(idEntity);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //query</span></span>
<span class="line"><span style="color:#A6ACCD;">        Test07Entity retEntity=test07Mapper.selectByMultiId(idEntity);</span></span>
<span class="line"><span style="color:#A6ACCD;">        retEntity.setCol1(&quot;xxxx&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //update</span></span>
<span class="line"><span style="color:#A6ACCD;">        test07Mapper.updateByMultiId(retEntity);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>service\u5C42\u7EE7\u627FIMppService\u63A5\u53E3\u548CMppServiceImpl</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">public interface Test07Service extends IMppService&lt;Test07Entity&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">public class Test07ServiceImpl extends MppServiceImpl&lt;Test07Mapper, Test07Entity&gt; implements Test07Service {</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u5728service\u5C42\u8C03\u7528\u591A\u4E3B\u952E\u64CD\u4F5C</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">    public void testMultiIdService(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        //id</span></span>
<span class="line"><span style="color:#A6ACCD;">        Test07Entity idEntity=new Test07Entity();</span></span>
<span class="line"><span style="color:#A6ACCD;">        idEntity.setK1(1);</span></span>
<span class="line"><span style="color:#A6ACCD;">        idEntity.setK2(&quot;111&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //del</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        test07Service.deleteByMultiId(idEntity);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //add</span></span>
<span class="line"><span style="color:#A6ACCD;">        test07Service.save(idEntity);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //query</span></span>
<span class="line"><span style="color:#A6ACCD;">        Test07Entity retEntity=test07Service.selectByMultiId(idEntity);</span></span>
<span class="line"><span style="color:#A6ACCD;">        retEntity.setCol1(&quot;xxxx&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //update</span></span>
<span class="line"><span style="color:#A6ACCD;">        test07Mapper.updateByMultiId(retEntity);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u6839\u636E\u590D\u5408\u4E3B\u952E\u8FDB\u884C\u6279\u91CF\u64CD\u4F5C\u548CsaveOrUpdate\u64CD\u4F5C</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">    @Test</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void testSaveOrUpdateByMultiIdService(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        //id</span></span>
<span class="line"><span style="color:#A6ACCD;">        Test07Entity idEntity=new Test07Entity();</span></span>
<span class="line"><span style="color:#A6ACCD;">        idEntity.setK1(6);</span></span>
<span class="line"><span style="color:#A6ACCD;">        idEntity.setK2(&quot;666&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //del</span></span>
<span class="line"><span style="color:#A6ACCD;">        test07Service.deleteByMultiId(idEntity);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //add</span></span>
<span class="line"><span style="color:#A6ACCD;">        test07Service.saveOrUpdateByMultiId(idEntity);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //update</span></span>
<span class="line"><span style="color:#A6ACCD;">        idEntity.setCol1(&quot;ccccc&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        test07Service.saveOrUpdateByMultiId(idEntity);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    @Test</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void testSaveOrUpdateBatchByMultiIdService(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        //ids</span></span>
<span class="line"><span style="color:#A6ACCD;">        List&lt;Test07Entity&gt; entityList=new ArrayList&lt;Test07Entity&gt;();</span></span>
<span class="line"><span style="color:#A6ACCD;">        for(int i=10;i&lt;30;i++){</span></span>
<span class="line"><span style="color:#A6ACCD;">            Test07Entity idEntity=new Test07Entity();</span></span>
<span class="line"><span style="color:#A6ACCD;">            idEntity.setK1(i);</span></span>
<span class="line"><span style="color:#A6ACCD;">            idEntity.setK2(String.valueOf(i*10));</span></span>
<span class="line"><span style="color:#A6ACCD;">            entityList.add(idEntity);</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        //del</span></span>
<span class="line"><span style="color:#A6ACCD;">        for(Test07Entity idEntity:entityList) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            test07Service.deleteByMultiId(idEntity);</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">        //add batch</span></span>
<span class="line"><span style="color:#A6ACCD;">        test07Service.saveOrUpdateBatchByMultiId(entityList);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //del</span></span>
<span class="line"><span style="color:#A6ACCD;">        for(Test07Entity idEntity:entityList) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            idEntity.setCol1(new Date().toString());</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">        //update batch</span></span>
<span class="line"><span style="color:#A6ACCD;">        test07Service.saveOrUpdateBatchByMultiId(entityList);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    @Test</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void testUpdateBatchByMultiIdService(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        //ids</span></span>
<span class="line"><span style="color:#A6ACCD;">        List&lt;Test07Entity&gt; entityList=new ArrayList&lt;Test07Entity&gt;();</span></span>
<span class="line"><span style="color:#A6ACCD;">        for(int i=50;i&lt;80;i++){</span></span>
<span class="line"><span style="color:#A6ACCD;">            Test07Entity idEntity=new Test07Entity();</span></span>
<span class="line"><span style="color:#A6ACCD;">            idEntity.setK1(i);</span></span>
<span class="line"><span style="color:#A6ACCD;">            idEntity.setK2(String.valueOf(i*10));</span></span>
<span class="line"><span style="color:#A6ACCD;">            entityList.add(idEntity);</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        //del</span></span>
<span class="line"><span style="color:#A6ACCD;">        for(Test07Entity idEntity:entityList) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            test07Service.deleteByMultiId(idEntity);</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">        //add batch</span></span>
<span class="line"><span style="color:#A6ACCD;">        test07Service.saveOrUpdateBatchByMultiId(entityList);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //del</span></span>
<span class="line"><span style="color:#A6ACCD;">        for(Test07Entity idEntity:entityList) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            idEntity.setCol1(new Date().toString());</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">        //update batch</span></span>
<span class="line"><span style="color:#A6ACCD;">        test07Service.updateBatchByMultiId(entityList);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>\u4F18\u5316\u5206\u9875\u63D2\u4EF6\u5B9E\u73B0\u5728\u4E0D\u5206\u9875\u65F6\u8FDB\u884C\u6392\u5E8F\u64CD\u4F5C\uFF081.6.0\u7248\u672C\u5DF2\u5220\u9664\uFF09</strong> \u4F7F\u7528MppPaginationInterceptor\u63D2\u4EF6</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">    @Bean</span></span>
<span class="line"><span style="color:#A6ACCD;">    public PaginationInterceptor paginationInterceptor() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        return new MppPaginationInterceptor();</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>mapper\u4E2D\u6309\u7167\u4E00\u822C\u5206\u9875\u63A5\u53E3\u5B9A\u4E49\uFF0C\u540C\u65F6\u652F\u6301\u8FD4\u56DE\u503C\u4E3Alist\u6216page\u5BF9\u8C61\u7684\u5199\u6CD5</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">@Mapper</span></span>
<span class="line"><span style="color:#A6ACCD;">public interface TestMapper extends BaseMapper&lt;TestEntity&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    public List&lt;JoinEntity&gt; queryUseRM(Page page);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>page\u53C2\u6570\u8BBE\u7F6Esize=-1\u4E3A\u5168\u91CF\u67E5\u8BE2\uFF0Csize&gt;0\u65F6\u6B63\u5E38\u5206\u9875\uFF0C\u8BBE\u7F6EOrderItem\u8FDB\u884C\u65E0\u8BBA\u662F\u5426\u5206\u9875\u90FD\u5B9E\u73B0\u6392\u5E8F</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">    public void testOrder(){</span></span>
<span class="line"><span style="color:#A6ACCD;">        Page page=new Page();</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        page.setSize(-1);</span></span>
<span class="line"><span style="color:#A6ACCD;">        page.addOrder(new OrderItem().setColumn(&quot;test.id&quot;).setAsc(true));</span></span>
<span class="line"><span style="color:#A6ACCD;">        page.addOrder(new OrderItem().setColumn(&quot;test2.some2&quot;).setAsc(true));</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        List rp=testMapper.queryUseRM(page);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="\u5E38\u89C1\u95EE\u9898\u8BF4\u660E" tabindex="-1">\u5E38\u89C1\u95EE\u9898\u8BF4\u660E <a class="header-anchor" href="#\u5E38\u89C1\u95EE\u9898\u8BF4\u660E" aria-hidden="true">#</a></h2><blockquote><p>\u62A5\u9519Caused by: org.apache.ibatis.binding.BindingException: Invalid bound statement (not found):</p></blockquote><p>\u89E3\u51B3\u65B9\u6CD5\uFF1A\u5728\u542F\u52A8\u7C7B\u4E2D\u4F7F\u7528@EnableMPP\u6CE8\u89E3\uFF0C\u4E00\u822C\u62A5Invalid bound statement (not found)\u90FD\u662F\u6CA1\u6709\u4F7F\u7528@EnableMPP</p><blockquote><p>\u6DFB\u52A0@EnableMPP\u540E\u542F\u52A8\u62A5\u9519required a single bean, but 2 were found</p></blockquote><p>\u4EA7\u751F\u539F\u56E0:\u6DFB\u52A0@EnableMpp\u540E\u4F1A\u542F\u7528\u5185\u7F6E\u7684metaObjectHandler\u5B9E\u73B0\u7C7B\u5B9E\u73B0\u81EA\u52A8\u586B\u5145\u529F\u80FD\uFF0C\u5982\u679C\u65E7\u9879\u76EE\u4E2D\u81EA\u884C\u5B9E\u73B0\u4E86metaObjectHandler\u4F1A\u4EA7\u751Frequired a single bean\u7C7B\u4F3C\u51B2\u7A81 \u89E3\u51B3\u65B9\u6CD5:\u9700\u5220\u6389\u81EA\u5B9A\u4E49\u7684\u7EE7\u627FmetaObjectHandler\u5B9E\u73B0\u7684\u586B\u5145\u529F\u80FD</p><p><em>\u5982\u679C\u52A0\u4E86@EnableMPP\u540E\u4ECD\u7136\u62A5Invalid bound statement (not found)</em></p><p>\u9700\u8981\u68C0\u67E5\u662F\u5426\u5B9E\u73B0\u4E86\u81EA\u5B9A\u4E49\u7684SqlSessionFactory\uFF0C\u5982\u679C\u5B9E\u73B0\u81EA\u5B9A\u4E49\u7684SqlSessionFactory\u5219\u9700\u8981\u624B\u5DE5\u6CE8\u5165 MppSqlInjector\uFF08\u5426\u5219\u5F15\u53D1Invalid bound statement\uFF09, MppKeyGenerator(\u5426\u5219\u65E0\u6CD5\u4E3B\u952E\u751F\u6210), DataAutoFill\uFF08\u5426\u5219\u65E0\u6CD5\u81EA\u52A8\u586B\u5145\uFF09 \u81EA\u5B9A\u4E49SqlSessionFactory\u6CE8\u5165\u793A\u4F8B\u5982\u4E0B</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">    public SqlSessionFactory sqlSessionFactory(DataSource dateSource, MybatisPlusProperties properties, MppSqlInjector mppSqlInjector, MppKeyGenerator mppKeyGenerator, DataAutoFill dataAutoFill) throws Exception {</span></span>
<span class="line"><span style="color:#A6ACCD;">        MybatisSqlSessionFactoryBean bean=new MybatisSqlSessionFactoryBean();</span></span>
<span class="line"><span style="color:#A6ACCD;">        GlobalConfig globalConfig = properties.getGlobalConfig();</span></span>
<span class="line"><span style="color:#A6ACCD;">        globalConfig.setSqlInjector(mppSqlInjector);</span></span>
<span class="line"><span style="color:#A6ACCD;">        globalConfig.setMetaObjectHandler(dataAutoFill);</span></span>
<span class="line"><span style="color:#A6ACCD;">        globalConfig.getDbConfig().setKeyGenerator(mppKeyGenerator);</span></span>
<span class="line"><span style="color:#A6ACCD;">        bean.setDataSource(dateSource);</span></span>
<span class="line"><span style="color:#A6ACCD;">        bean.setGlobalConfig(globalConfig);</span></span>
<span class="line"><span style="color:#A6ACCD;">        return bean.getObject();</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><em>\u542F\u52A8\u65F6\u62A5\u5F02\u5E38NoSuchFieldException: modifiers</em></p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">org.springframework.beans.factory.BeanCreationException: </span></span>
<span class="line"><span style="color:#A6ACCD;">Error creating bean with name &#39;com.github.jeffreyning.mybatisplus.conf.PlusConfig&#39;: </span></span>
<span class="line"><span style="color:#A6ACCD;">Invocation of init method failed; nested exception is java.lang.NoSuchFieldException: modifiers</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u5E94\u8BE5\u662Fjdk11\u4E0E\u81EA\u5B9A\u4E49ognl\u52A0\u8F7D\u673A\u5236\u4E0D\u517C\u5BB9\u5BFC\u81F4\u7684\u3002 mybatisplus-plus1.7.0\u5220\u9664\u4E86\u81EA\u5B9A\u4E49ognl\u6839\u8DEF\u5F84\u529F\u80FD\uFF0C\u517C\u5BB9jdk11\u3002</p><p><em>\u62A5 not found column for &#39;id&#39;</em> mybatis-plus\u7684\u95EE\u9898\uFF0C\u6240\u6709\u53EBid\u7684\u5C5E\u6027\u90FD\u81EA\u52A8\u6CE8\u518C\u4E3A\u4E3B\u952E</p><p><em>\u542F\u52A8\u65F6\u65E5\u5FD7\u4E2D\u6709mpp.entityBasePath is null skip scan result map</em> \u53EA\u662F\u4E2A\u63D0\u793A\u4E0D\u5F71\u54CD\uFF0C\u4E0D\u60F3\u770B\u5230\u63D0\u793A\uFF0Cmpp.entityBasePath\u53EF\u4EE5\u914D\u7F6E\u5230entity\u7684\u5305\u5982entityBasePath: com.github.jeffreyning.mybatisplus.demo.entity\uFF1B \u5982\u679Cxml\u4E2D\u6709resultMap=&quot;scan.mybatis-plus_xxx&quot;\u624D\u9700\u8981\u914D\u7F6Empp.entityBasePath</p><p><em>\u63D0\u793Ajava.lang.RuntimeException: not found column for &#39;xxx&#39;</em> \u662F\u7531\u4E8E\u8BBE\u7F6E\u4E86@MppMultiId\u7684\u5B57\u6BB5\u6CA1\u6709\u540C\u65F6\u8BBE\u7F6E@TableField(value = &quot;xxx&quot;)\u5BFC\u81F4\u7684</p><p><em>\u5982\u4F55\u6574\u5408pagehelper\u63D2\u4EF6</em></p><p>mybatisplus\u672C\u8EAB\u6709\u5206\u9875\u5E38\u89C1\uFF0C\u5982\u679C\u4E00\u5B9A\u8981\u4F7F\u7528pagehelper\u63D2\u4EF6\u7684\u8BDD\uFF0C\u4E0E\u539F\u751F\u7684mybatisplus\u6709\u51B2\u7A81 \u89E3\u51B3\u65B9\u6CD5\u4E3A\uFF1A\u4F7F\u7528\u4EE5\u4E0B\u4EE3\u7801\u52A0\u8F7DpageHelper(\u7248\u672C\u4E3A5.1.10)</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">    @Bean</span></span>
<span class="line"><span style="color:#A6ACCD;">    ConfigurationCustomizer mybatisConfigurationCustomizer() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        return new ConfigurationCustomizer() {</span></span>
<span class="line"><span style="color:#A6ACCD;">            @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">            public void customize(Configuration configuration) {</span></span>
<span class="line"><span style="color:#A6ACCD;">                configuration.addInterceptor(new com.github.pagehelper.PageInterceptor());</span></span>
<span class="line"><span style="color:#A6ACCD;">            }</span></span>
<span class="line"><span style="color:#A6ACCD;">        };</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="\u517C\u5BB9\u6027\u8BF4\u660E" tabindex="-1">\u517C\u5BB9\u6027\u8BF4\u660E <a class="header-anchor" href="#\u517C\u5BB9\u6027\u8BF4\u660E" aria-hidden="true">#</a></h2><ul><li><p>mybatisplus-plus1.5.0\u517C\u5BB9mybatisplus3.3.1(mybatis3.5.3)\u5230\u6700\u65B0\u7248mybatisplus3.4.2(mybatis3.5.6)</p></li><li><p>mybatisplus-plus1.5.1\u4E0E\u6700\u9AD8\u5230mybatisplus3.4.3.1\u517C\u5BB9</p><ul><li>mybatisplus-plus1.5.1\u4E0Emybatisplus3.4.3\u4E0D\u517C\u5BB9\uFF0Cmybatisplus3.4.3\u81EA\u8EAB\u6709bug\u65E0\u6CD5\u4F7F\u7528\uFF0C\u62A5<code>sun.reflect.generics.reflectiveObjects.TypeVariableImpl cannot be cast to java.lang.Class</code></li><li>mybatisplus-plus1.5.1\u4E0Emybatisplus3.4.3.2\u4E0D\u517C\u5BB9\uFF0C\u62A5<code>org.apache.ibatis.binding.BindingException: Invalid bound statement (not found)</code></li></ul></li><li><p>mybatisplus-plus1.6.0\u4E0Emybatisplus3.4.3.2+\u517C\u5BB9\uFF08\u5DF2\u7ECF\u6D4B\u8BD5\u5230mybatisplus3.4.3.4\uFF09</p></li><li><p>mybatisplus-plus1.7.0\u517C\u5BB9jdk11(\u5220\u9664\u4E86\u81EA\u5B9A\u4E49ognl\u6839\u8DEF\u5F84\u529F\u80FD)</p></li></ul>`,76),t=[e];function o(i,c,r,C,A,y){return a(),n("div",null,t)}const D=s(p,[["render",o]]);export{d as __pageData,D as default};
