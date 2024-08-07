import React from 'react';
import './Section.scss'

interface ISection {
  title?: string;
  children: any;
}

export default function Section({ ...props }: ISection) {
  return (
    <div className='section_container'>
      {props.title && <h1 className='section_container__title'>{props.title}</h1>}
      {props.children}
    </div>
  )
}
