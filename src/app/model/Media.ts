export interface Media {
    url_media:{
        type: String,
        required: true,
    };
    caption: {
        type: String,
        required: true,
    };
    is_video:{
        type: Boolean,
        required: true,
    };
    is_ads: {
        type: Boolean,
        required: true,
    };
    count_comments: {
        type: Number,
        required: true,
    };
    comments: {
        type: [],
        required: true,
    }
    
}