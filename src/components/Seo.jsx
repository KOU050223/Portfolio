import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const Seo = ({
    title = "魚住紘平|ウオミコウのポートフォリオサイト",
    description = "魚住紘平|ウオミコウのポートフォリオサイト",
    image = "/tinkani.svg",
    twitterCard = "summary_large_image",
    siteUrl = "https://portfoliosite-01v.pages.dev/",
}) => {
    const { pathname } = useLocation();
    const currentUrl = `${siteUrl}${pathname}`;

    // 画像URLの正規化
    const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

    return (
        <Helmet>
            {/* 基本メタタグ */}
            <title>{title}</title>
            <meta name="description" content={description} />

            {/* OGP基本タグ */}
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="情報技術研究部 | じょぎ" />
            <meta property="og:locale" content="ja_JP" />

            {/* Twitter Card */}
            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:site" content="@jyogi_pr" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageUrl} />

            {/* canonical URL */}
            <link rel="canonical" href={currentUrl} />
        </Helmet>
    );
};

export default Seo;
