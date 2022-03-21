const mongoose = require("mongoose");

const toJSON = {
  transform(doc, result) {
    delete result._id;
    result.id = doc._id;
  },
};

const IntegrationsSchema = new mongoose.Schema(
  {
    origin: { type: String, required: true },
    token: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
    id: true,
    toJSON,
  }
);

const UsersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    origin: { type: String },
    first_name: { type: String },
    last_name: { type: String },
    installed: { type: Boolean, default: true },
    permissions: [],
    token: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
    id: true,
    toJSON,
  }
);

const ReactionPostsSchema = new mongoose.Schema(
  {
    id: { type: String, default: null },
    name: { type: String, default: null },
    type: { type: String, default: null },
  },
  {
    versionKey: false,
    timestamps: true,
    id: true,
    toJSON,
  }
);

const CommentsSchema = new mongoose.Schema(
  {
    id: { type: String, default: null },
    can_comment: { type: Boolean, default: false },
    can_remove: { type: Boolean, default: false },
    can_hide: { type: Boolean, default: false },
    can_like: { type: Boolean, default: false },
    can_reply_privately: { type: Boolean, default: false },
    comment_count: { type: Number, default: 0 },
    page_id: { type: Number, default: 0 },
    post_id: { type: String, default: null },
    created_time: { type: Date, default: Date.now },
    from: {
      id: { type: String, default: null },
      name: { type: String, default: null },
    },
    like_count: { type: Number, default: 0 },
    message: { type: String, default: null },

    is_deleted: { type: Boolean, default: false },

    message_tags: [
      {
        id: { type: String, default: null },
        name: { type: String, default: null },
        type: {
          type: String,
          enum: ["link", "offer", "status", "offer", "video", "photo"],
        },
        offset: { type: Number, default: 0 },
        length: { type: Number, default: 0 },
      },
    ],

    parent: { type: String, default: null },
    user_likes: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
    id: true,
    toJSON,
  }
);

const PostsSchema = new mongoose.Schema(
  {
    id: { type: String, default: null },
    created_time: { type: Date, default: Date.now },
    actions: { type: String, default: null },
    admin_creator: {
      id: { type: Number, default: 0 },
      name: { type: String, default: null },
    },
    insights: [Object],
    shares: { type: Number, default: 0 },
    allowed_advertising_objects: { type: String, default: null },
    application: { type: String, default: null },
    attachments: { type: String, default: null },
    created_time: { type: Date, default: Date.now },
    message: { type: String, default: null },
    like_count: { type: Number, default: 0 },
    name: { type: String, default: null },
    object_id: { type: String, default: null },
    updated_time: { type: Date, default: Date.now },
    permalink_url: { type: String, default: null },
    place: { type: String, default: null },
    page_id: { type: Number, default: 0 },
    type: {
      type: String,
      enum: ["link", "offer", "status", "offer", "video", "photo"],
    },
    from: {
      id: { type: Number, default: 0 },
      name: { type: String, default: null },
    },
    comments: [String],
    reaction_ids: [String],
  },
  {
    versionKey: false,
    timestamps: true,
    id: true,
    toJSON,
  }
);

const PagesSchema = new mongoose.Schema(
  {
    about: { type: String, default: false },

    created_time: { type: Date, default: Date.now },
    token: { type: String, required: true },
    id: { type: Number, required: false },
    ad_campaign: { type: String, default: false },
    tasks: { type: Array, default: [] },

    affiliation: { type: String, default: null },
    app_id: { type: Number, default: null },
    artists_we_like: { type: String, default: null },
    attire: { type: String, default: null },
    awards: { type: String, default: null },
    band_interests: { type: Number, default: 0 },
    posts: [String],
    insights: [Object],

    band_members: { type: String, default: null },

    best_page: { type: String, default: null },

    bio: { type: String, default: null },
    birthday: { type: String, default: null },
    booking_agent: { type: String, default: null },
    built: { type: String, default: null },
    business: { type: String, default: null },

    can_checkin: { type: Boolean, default: false },
    can_post: { type: Boolean, default: false },
    category: { type: String, default: false },

    category_list: {
      PageCategory: [
        {
          lat: { type: String },
          long: { type: String },
        },
      ],
    },

    checkins: { type: Number, default: 0 },
    company_overview: { type: String, default: null },
    connected_instagram_account: {
      id: { type: String, default: null },
      name: { type: String, default: null },
      username: { type: String, default: null },
    },
    contact_address: { type: String, default: null },

    copyright_whitelisted_ig_partners: [String],
    country_page_likes: { type: Number },
    cover: {
      id: { type: String, default: null },
      offset_x: { type: Number, default: 0 },
      offset_y: { type: Number, default: 0 },
      source: { type: String, default: null },
    },
    culinary_team: { type: String, default: null },
    current_location: { type: String, default: null },
    delivery_and_pickup_option_info: [String],
    description: { type: String, default: null },
    description_html: { type: String, default: null },
    differently_open_offerings: [
      {
        type: Boolean,
        enum: ["DELIVERY", "DELIVERY"],
      },
    ],

    directed_by: { type: String, default: null },
    display_subtext: { type: String, default: null },
    displayed_message_response_time: { type: String, default: null },
    emails: [String],
    engagement: {
      count: { type: Number, default: 0 },
      count_string: { type: String, default: null },
      count_string_with_like: { type: String, default: null },
      count_string_without_like: { type: String, default: null },
      social_sentence: { type: String, default: null },
      social_sentence_with_like: { type: String, default: null },
      social_sentence_without_like: { type: String, default: null },
    },
    fan_count: { type: Number, default: 0 },
    featured_video: { type: String, default: null },
    features: { type: String, default: null },
    followers_count: { type: Number, default: 0 },
    food_styles: [String],
    founded: { type: String, default: null },
    general_info: { type: String, default: null },
    general_manager: { type: String, default: null },
    genre: { type: String, default: null },
    global_brand_page_name: { type: String, default: null },
    global_brand_root_id: { type: String, default: null },
    has_added_app: { type: Boolean, default: false },
    has_transitioned_to_new_page_experience: { type: Boolean, default: false },
    has_whatsapp_business_number: { type: Boolean, default: false },
    has_whatsapp_number: { type: Boolean, default: false },
    hometown: { type: String, default: null },
    hours: {
      type: Map,
      of: String,
    },
    impressum: {
      type: String,
      default: null,
    },
    influences: { type: String, default: null },
    instagram_business_account: {
      id: { type: String, default: null },
      name: { type: String, default: null },
      username: { type: String, default: null },
    },
    instant_articles_review_status: {
      type: String,
      enum: ["APPROVED", "APPROVED", "PENDING", "REJECTED", "REJECTED"],
    },
    is_always_open: { type: Boolean, default: false },
    is_chain: { type: Boolean, default: false },
    is_community_page: { type: Boolean, default: false },
    is_eligible_for_branded_content: { type: Boolean, default: false },
    is_messenger_bot_get_started_enabled: { type: Boolean, default: false },
    is_messenger_platform_bot: { type: Boolean, default: false },
    is_owned: { type: Boolean, default: false },
    is_permanently_closed: { type: Boolean, default: false },
    is_published: { type: Boolean, default: false },
    is_unclaimed: { type: Boolean, default: false },
    is_webhooks_subscribed: { type: Boolean, default: false },
    leadgen_tos_acceptance_time: { type: Date, default: Date.now },
    leadgen_tos_accepted: { type: Boolean, default: false },

    leadgen_tos_accepting_user: { type: String, default: null },

    link: { type: String, default: null },
    location: {
      coordinates: [
        {
          lat: { type: String },
          long: { type: String },
        },
      ],
      type: { type: String },
    },

    members: { type: String, default: null },
    merchant_id: { type: String, default: null },
    merchant_review_status: {
      type: String,
      enum: ["status1", "status2", "status3"],
    },

    messaging_feature_status: { type: String, default: null },
    messenger_ads_default_icebreakers: [String],
    messenger_ads_default_page_welcome_message: { type: String, default: null },
    messenger_ads_default_quick_replies: [String],
    messenger_ads_quick_replies_type: {
      type: String,
      enum: ["UNKNOWN", "PAGE_SHOP", "RETAIL"],
    },
    mission: { type: String, default: null },
    mpg: { type: String, default: null },
    name: { type: String, default: false },
    name_with_location_descriptor: { type: String, default: null },
    network: { type: String, default: null },
    new_like_count: { type: Number, default: 0 },
    offer_eligible: { type: Boolean, default: false },
    overall_star_rating: { type: Number, default: 0 },
    page_token: { type: String, default: null },

    parent_page: { type: String, default: null },

    parking: {
      lot: { type: Number, default: 0 },
      street: { type: Number, default: 0 },
      valet: { type: Number, default: 0 },
    },
    payment_options: {
      amex: { type: Number, default: 0 },
      cash_only: { type: Number, default: 0 },
      discover: { type: Number, default: 0 },
      mastercard: { type: Number, default: 0 },
      visa: { type: Number, default: 0 },
    },

    personal_info: { type: String, default: null },
    personal_interests: { type: String, default: null },
    pharma_safety_info: { type: String, default: null },
    phone: { type: String, default: null },
    pickup_options: [{ type: String, enum: ["CURBSIDE", "IN_STORE", "OTHER"] }],
    place_type: {
      type: String,
      enum: [
        "CITY",
        "COUNTRY",
        "EVENT",
        "GEO_ENTITY",
        "PLACE",
        "RESIDENCE",
        "STATE_PROVINCE",
        "TEXT",
      ],
    },
    plot_outline: { type: String, default: null },

    preferred_audience: { type: String, default: null },
    press_contact: { type: String, default: null },
    price_range: { type: String, default: null },
    privacy_info_url: { type: String, default: null },
    produced_by: { type: String, default: null },
    products: { type: String, default: null },
    promotion_eligible: { type: Boolean, default: false },
    promotion_ineligible_reason: { type: String, default: null },
    public_transit: { type: String, default: null },
    rating_count: { type: Number, default: 0 },
    recipient: { type: String, default: null },
    record_label: { type: String, default: null },
    release_date: { type: String, default: null },

    restaurant_services: {
      catering: { type: Boolean, default: false },
      delivery: { type: Boolean, default: false },
      groups: { type: Boolean, default: false },
      kids: { type: Boolean, default: false },
      outdoor: { type: Boolean, default: false },
      pickup: { type: Boolean, default: false },
      reserve: { type: Boolean, default: false },
      takeout: { type: Boolean, default: false },
      waiter: { type: Boolean, default: false },
      walkins: { type: Boolean, default: false },
    },
    restaurant_specialties: {
      breakfast: { type: Number, default: 0 },
      coffee: { type: Number, default: 0 },
      dinner: { type: Number, default: 0 },
      drinks: { type: Number, default: 0 },
      lunch: { type: Number, default: 0 },
    },

    schedule: { type: String, default: null },
    screenplay_by: { type: String, default: null },
    season: { type: String, default: null },
    single_line_address: { type: String, default: null },
    starring: { type: String, default: null },

    start_info: {
      date: { type: Date, default: Date.now },
      type: { type: String, default: null },
    },
    store_code: { type: String, default: null },
    store_location_descriptor: { type: String, default: null },
    store_number: { type: Number, default: 0 },
    studio: { type: String, default: null },
    supports_donate_button_in_live_video: { type: Boolean, default: false },
    supports_instant_articles: { type: Boolean, default: false },
    talking_about_count: { type: Number, default: 0 },
    temporary_status: {
      type: String,
      enum: [
        "differently_open",
        "temporarily_closed",
        "operating_as_usual",
        "no_data",
      ],
    },
    unread_message_count: { type: Number, default: 0 },
    unread_notif_count: { type: Number, default: 0 },
    unseen_message_count: { type: Number, default: 0 },
    username: { type: String, default: null },
    verification_status: { type: String, default: null },
    voip_info: {
      has_mobile_app: { type: Boolean, default: false },
      has_permission: { type: Boolean, default: false },
      is_callable: { type: Boolean, default: false },
      is_callable_webrtc: { type: Boolean, default: false },
      is_pushable: { type: Boolean, default: false },
      reason_code: { type: Boolean, default: false },
      reason_description: { type: Boolean, default: false },
    },
    website: { type: String, default: null },
    were_here_count: { type: Number, default: 0 },
    whatsapp_number: { type: String, default: null },
    written_by: { type: String, default: null },
  },
  {
    versionKey: false,
    timestamps: true,
    id: true,
    toJSON,
  }
);

const ProfilesSchema = new mongoose.Schema(
  {
    id: { type: String, default: null },
    name: { type: String, required: true },
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    profile_pic: { type: String, default: null },
    token_for_business: { type: String, default: null },
    installed: { type: Boolean, default: false },
    is_guest_user: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
    id: true,
    toJSON,
  }
);

UsersSchema.statics = {
  async updateUserOrigin(id, origin) {
    return Users.findByIdAndUpdate(
      id,
      { $set: { origin } },
      { upsert: false, new: true }
    );
  },
  async updateUserStatus(id, installed) {
    return Users.findByIdAndUpdate(
      id,
      { $set: { installed } },
      { upsert: false, new: true }
    );
  },
};

PagesSchema.statics = {
  async findOrCreate(id, creator) {
    return Pages.findById(id).then((page) => {
      return !!page ? page : creator();
    });
  },
  async setInstagram(page, instagram) {
    return Pages.findByIdAndUpdate(
      page,
      { instagram },
      { upsert: false, new: true }
    );
  },
};

ProfilesSchema.statics = {
  async findOrCreate(id, creator) {
    return Profiles.findById(id).then((profile) => {
      return !!profile ? profile : creator();
    });
  },
};

PostsSchema.statics = {
  async findOrCreate(id, creator) {
    return Posts.findById(id).then((post) => {
      return !!post ? post : creator();
    });
  },
};

const Users = mongoose.model("Users", UsersSchema);
const Pages = mongoose.model("Pages", PagesSchema);
const Profiles = mongoose.model("Profiles", ProfilesSchema);
const Integrations = mongoose.model("Integrations", IntegrationsSchema);
const Posts = mongoose.model("Posts", PostsSchema);
const Comments = mongoose.model("Comments", CommentsSchema);
const ReactionPosts = mongoose.model("ReactionPosts", ReactionPostsSchema);

module.exports = {
  Users,
  Pages,
  Profiles,
  Integrations,
  Posts,
  Comments,
  ReactionPosts,
};
