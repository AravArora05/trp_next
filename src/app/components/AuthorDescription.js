"use client";

import React from 'react';
import Link from 'next/link';

const AuthorDescription = ({ author }) => {
  if (!author || author.length === 0) {
    return null;
  }
  console.log(author);

  return (
    <div className="author-information-container">
    
      <h2 className="all-posts-by">Filed Under</h2>
      <h4 className="author-name">{author[0].name}</h4>
      <hr className="divider" />
      <article className="author-preview">
        <img
          className="linkedin-image story-image"
          src={author[0].image}
          alt={`Author: ${author[0].name} image`}
        />
        <div className="information-container">
          <h3 className="story-author">
            <span className="underline">{author[0].name}</span>
          </h3>
          <h4 className="story-title">{author[0].intro}</h4>
          <Link href={author[0].github}>
            <img 
              src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" 
              style={{ width: '20px', height: '20px' }}
              alt="GitHub"
            />
          </Link>
          <Link href={author[0].linkedin}>
            <img 
              src="https://static.vecteezy.com/system/resources/previews/023/986/970/original/linkedin-logo-linkedin-logo-transparent-linkedin-icon-transparent-free-free-png.png" 
              style={{ width: '20px', height: '20px' }}
              alt="LinkedIn"
            />
          </Link>
        </div>
      </article>
    </div>
  );
};

export default AuthorDescription;
