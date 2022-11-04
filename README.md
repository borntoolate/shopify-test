# Shopifyチャレンジ

---

## Memo

### Default Theme: Dawn

https://github.com/Shopify/dawn

#### Style

- モバイルファーストで記述する
- 単位は基本rem htmlにfont-size: 62.5%指定されている = 1rem = 10px

```scss
// @media only screen and (min-width: 750px) {
// @media screen and (max-width: 749px) {
// @media screen and (min-width: 750px) and (max-width: 989px) {
// @media screen and (min-width: 990px) {

// css var
// font-family: var(--font-body-family);
// font-style: var(--font-body-style);
// font-weight: var(--font-body-weight);
// font-family: var(--font-heading-family);
// font-style: var(--font-heading-style);
// font-weight: var(--font-heading-weight);
```

---

## Reference

- https://kobe-tshirt.com/shopify-code/


---

## Scratch Pad

```
Liquidのproduct.media属性を使用する

product.media属性は、商品ページに動画や3Dモデル、画像を表示させるための基礎ブロックです。

以前はproduct.imagesを使ってテーマの調整がおこなわれていましたが、現在では商品画像のほかに関連ビデオや3Dモデルもサポートされたため、product.media属性を使用することができます。product.mediaはproduct.imagesと同じように使用すればよいのですが、はるかに強力です！

Liquidメディアフィルターを使わずに単独でproduct. mediaを使用した場合、画像のファイルバスと、ビデオおよび3DモデルのLiquidドロップを混合したものが返されます。たとえば、{{ product.media }}をproduct.liquidファイルに追加すると、以下のような内容がページにレンダリングされます。

products/boat-shoes.jpgVideoDropExternalVideoDrop

ここでは、boat-shoes.jpgという1つの商品関連画像があり、同様に管理画面にアップロードされたビデオと外部にホストされたビデオがあることが示されています。しかし、画像またはビデオをメディアとしてページ上に表示させるためには、メディアフィルターを使って適切なHTMLタグを適用し、メディアアイテムが正しくレンダリングされるようにする必要があります。
```

https://www.shopify.com/jp/blog/partner-custom-shopify-theme-product-media-insert

### ページ条件分岐

```liquid
{%- if request.page_type == 'index' -%}
{%- endif -%}
{%- if template == 'index' -%}
{%- endif -%}
```
