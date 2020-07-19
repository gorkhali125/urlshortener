import { Component } from 'react';
import { UrlShortenerService } from '../services/Urlshortener.service';

class ResolveUrlHash extends Component {
    render() {

        let urlHash = this.props.match.params.shortUrl;
        UrlShortenerService.resolveUrl(urlHash)
            .then((data) => {
                if (data.status === 200) {
                    window.location.href = data.originalUrl;
                } else {
                    this.props.history.push('/page/not/found');
                }
            });

        return '';
    }
}

export default ResolveUrlHash;
