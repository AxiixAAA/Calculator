import React, { FC } from 'react'
import fbLogo from "../../../../assets/images/contactLogos/facebook.png";
import webLogo from "../../../../assets/images/contactLogos/web.png";
import vkLogo from "../../../../assets/images/contactLogos/vk.png";
import twLogo from "../../../../assets/images/contactLogos/twitter.png";
import instLogo from "../../../../assets/images/contactLogos/instagram.png";
import ytLogo from "../../../../assets/images/contactLogos/youtube.png";
import gitLogo from "../../../../assets/images/contactLogos/github.png";
import styles from "./SocialLinks.module.css";

export const SocialLinks: FC<TProps> = ({ fb, web, vk, tw, inst, yt, git }) => {
  return <>
    {fb && <a href={fb} target='_blank' rel='noreferrer' className={styles.link}><img src={fbLogo} alt={fb} width='32px' /></a>}
    {web && <a href={web} target='_blank' rel='noreferrer' className={styles.link}><img src={webLogo} alt={web} width='32px' /></a>}
    {vk && <a href={vk} target='_blank' rel='noreferrer' className={styles.link}><img src={vkLogo} alt={vk} width='32px' /></a>}
    {tw && <a href={tw} target='_blank' rel='noreferrer' className={styles.link}><img src={twLogo} alt={tw} width='32px' /></a>}
    {inst && <a href={inst} target='_blank' rel='noreferrer' className={styles.link}><img src={instLogo} alt={inst} width='32px' /></a>}
    {yt && <a href={yt} target='_blank' rel='noreferrer' className={styles.link}><img src={ytLogo} alt={yt} width='32px' /></a>}
    {git && <a href={git} target='_blank' rel='noreferrer' className={styles.link}><img src={gitLogo} alt={git} width='32px' /></a>}
    {!fb && !web && !vk && !tw && !inst && !yt && !git && <span className={styles.span}>Контактов не оставляет</span>}
  </>
}


type TProps = {
  fb: string
  web: string
  vk: string
  tw: string
  inst: string
  yt: string
  git: string
}