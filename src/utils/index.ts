export function formatNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'm';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    } else {
        return num.toString();
    }
}
export function areObjectsEqual(obj1: { [key: string]: any }, obj2: { [key: string]: any }): boolean {
    for (const key in obj1) {
        if (obj2.hasOwnProperty(key) && obj1[key] !== obj2[key]) {
            return false;
        }
    }

    for (const key in obj2) {
        if (obj1.hasOwnProperty(key) && obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
}
export function convertDate(dateString: string): string {
    const dateParts = dateString.split(' ');
    const date = dateParts[0].split('-');
    const year = parseInt(date[0], 10);
    const month = parseInt(date[1], 10);
    const day = parseInt(date[2], 10);
    const timeParts = dateParts[1].split(':');
    const hour = parseInt(timeParts[0], 10);
    const minute = parseInt(timeParts[1], 10);
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() + 1;
    const todayDay = today.getDate();
    const monthNames: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if (year === todayYear && month === todayMonth && day === todayDay) {
        return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    } else {
        return `${monthNames[month - 1]} ${day}`;
    }
}


// Helper function to detect platform and return embeddable URLs or use directly embeddable URLs
export const getEmbeddedVideoUrl = (url: string): { embedUrl: string | null, type: 'iframe' | 'video' | 'link' | 'invalid' } => {
    let embedUrl: string | null = null;
    let type: 'iframe' | 'video' | 'link' | 'invalid' = 'link';
  
    // Validate general URL structure before checking platforms
    const validUrlPattern = /^(https?:\/\/[^\s]+)$/;
    if (!validUrlPattern.test(url)) {
      return { embedUrl: null, type: 'invalid' };  // If URL is invalid
    }
  
    // Check platform and set embed URL and type
    switch (true) {
      // YouTube Embed URLs (directly usable)
      case /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^\s&]+)/.test(url):
        embedUrl = url; // Already usable in <iframe>
        type = 'iframe';
        break;
  
      // Vimeo Embed URLs (directly usable)
      case /(?:https?:\/\/)?player\.vimeo\.com\/video\/([^\s&]+)/.test(url):
        embedUrl = url; // Already usable in <iframe>
        type = 'iframe';
        break;
  
      // Dailymotion Embed URLs (directly usable)
      case /(?:https?:\/\/)?(?:www\.)?dailymotion\.com\/embed\/video\/([a-zA-Z0-9]+)/.test(url):
        embedUrl = url; // Already usable in <iframe>
        type = 'iframe';
        break;
  
      // Facebook Embed URLs (directly usable)
      case /(?:https?:\/\/)?(?:www\.)?facebook\.com\/plugins\/video\.php\?href=/.test(url):
        embedUrl = url; // Already usable in <iframe>
        type = 'iframe';
        break;
  
      // Twitch Embed URLs (directly usable)
      case /(?:https?:\/\/)?player\.twitch\.tv\/\?video=([^\s&]+)/.test(url):
        embedUrl = url; // Already usable in <iframe>
        type = 'iframe';
        break;
  
      // TikTok Embed URLs (directly usable)
      case /(?:https?:\/\/)?www\.tiktok\.com\/embed\/([^\s&]+)/.test(url):
        embedUrl = url; // Already usable in <iframe>
        type = 'iframe';
        break;
  
      // YouTube Watch URLs (need conversion to embed)
      case /(?:https?:\/\/)?(?:www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([^\s&]+)/.test(url):
        embedUrl = `https://www.youtube.com/embed/${url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&]+)/)?.[1]}`;
        type = 'iframe';
        break;
  
      // Vimeo URLs (need conversion to embed)
      case /(?:https?:\/\/)?(?:www\.)?(vimeo\.com\/)(\d+)/.test(url):
        embedUrl = `https://player.vimeo.com/video/${url.match(/vimeo\.com\/(\d+)/)?.[1]}`;
        type = 'iframe';
        break;
  
      // Dailymotion URLs (need conversion to embed)
      case /(?:https?:\/\/)?(?:www\.)?dailymotion\.com\/video\/([a-zA-Z0-9]+)/.test(url):
        embedUrl = `https://www.dailymotion.com/embed/video/${url.match(/dailymotion\.com\/video\/([a-zA-Z0-9]+)/)?.[1]}`;
        type = 'iframe';
        break;
  
      // Direct video files (.mp4, .webm)
      case /\.(mp4|webm)$/i.test(url):
        embedUrl = url; // Use directly in the <video> tag
        type = 'video';
        break;
  
      // Default (unsupported platforms will just provide a link)
      default:
        embedUrl = url;
        type = 'link';
        break;
    }
  
    return { embedUrl, type };
  };

 export const isValidEmail=(email:string)=> {
    const emailRegex = /^[^\s@]+@gmail\.com$/;
    return emailRegex.test(email);
}

