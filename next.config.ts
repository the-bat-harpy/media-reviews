// next.config.ts
import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;
const repoName = "media-reviews"; // Substitui pelo nome exato do teu repositório no GitHub

const nextConfig: NextConfig = {
  output: "export", // Gera ficheiros HTML/CSS/JS estáticos na pasta 'out'
  images: {
    unoptimized: true, // Necessário para o GitHub Pages processar imagens
  },
  // Apenas ativa basePath se for publicado num subdiretório do GitHub Pages
  basePath: isGithubActions ? `/${repoName}` : "",
  assetPrefix: isGithubActions ? `/${repoName}/` : "",
};

export default nextConfig;