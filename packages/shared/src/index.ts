generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String         @id @default(cuid())
  email         String         @unique
  password      String
  role          UserRole       @default(AFFILIATE)
  status        UserStatus     @default(ACTIVE)
  createdAt     DateTime       @default(now()) @map("created_at")
  updatedAt     DateTime       @updatedAt @map("updated_at")
  profile       Profile?
  campaigns     Campaign[]
  apiKeys       ApiKey[]
  notifications Notification[]
  subscriptions Subscription?
  teamMembers   TeamMember[]
  auditLogs     AuditLog[]
  aiInsights    AiInsight[]

  @@map("users")
}

enum UserRole {
  ADMIN
  ADVERTISER
  AFFILIATE
  MANAGER
}

enum UserStatus {
  ACTIVE
  SUSPENDED
  PENDING
}

model Profile {
  id         String  @id @default(cuid())
  userId     String  @unique @map("user_id")
  firstName  String? @map("first_name")
  lastName   String? @map("last_name")
  company    String?
  timezone   String  @default("UTC")
  avatarUrl  String? @map("avatar_url")
  telegramId String? @map("telegram_id")
  user       User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("profiles")
}

model Team {
  id        String       @id @default(cuid())
  name      String
  ownerId   String       @map("owner_id")
  createdAt DateTime     @default(now()) @map("created_at")
  members   TeamMember[]
  campaigns Campaign[]

  @@map("teams")
}

model TeamMember {
  id       String   @id @default(cuid())
  teamId   String   @map("team_id")
  userId   String   @map("user_id")
  role     TeamRole @default(MEMBER)
  joinedAt DateTime @default(now()) @map("joined_at")
  team     Team     @relation(fields: [teamId], references: [id], onDelete: Cascade)
  user     User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([teamId, userId])
  @@map("team_members")
}

enum TeamRole {
  OWNER
  ADMIN
  MEMBER
  VIEWER
}

model ApiKey {
  id         String    @id @default(cuid())
  userId     String    @map("user_id")
  name       String
  keyHash    String    @map("key_hash")
  keyPrefix  String    @map("key_prefix")
  permissions String[] @default(["read"])
  lastUsedAt DateTime? @map("last_used_at")
  expiresAt  DateTime? @map("expires_at")
  revokedAt  DateTime? @map("revoked_at")
  createdAt  DateTime  @default(now()) @map("created_at")
  user       User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("api_keys")
}

model Network {
  id              String        @id @default(cuid())
  name            String
  slug            String        @unique
  logoUrl         String?       @map("logo_url")
  apiEndpoint     String?       @map("api_endpoint")
  postbackUrl     String?       @map("postback_url")
  supportedModels String[]      @default(["CPA", "CPI", "CPL"]) @map("supported_models")
  status          NetworkStatus @default(ACTIVE)
  createdAt       DateTime      @default(now()) @map("created_at")
  offers          Offer[]

  @@map("networks")
}

enum NetworkStatus {
  ACTIVE
  INACTIVE
  MAINTENANCE
}

model Offer {
  id             String       @id @default(cuid())
  networkId      String       @map("network_id")
  externalId     String?      @map("external_id")
  name           String
  description    String?
  payout         Decimal      @db.Decimal(10, 4)
  currency       String       @default("USD")
  payoutType     PayoutType   @default(FIXED) @map("payout_type")
  payoutPercent  Decimal?     @db.Decimal(5, 2) @map("payout_percent")
  countries      String[]     @default([])
  languages      String[]     @default([])
  os             String[]     @default([])
  browsers       String[]     @default([])
  devices        String[]     @default([])
  carriers       String[]     @default([])
  dailyCap       Int?         @map("daily_cap")
  totalCap       Int?         @map("total_cap")
  startDate      DateTime?    @map("start_date")
  endDate        DateTime?    @map("end_date")
  landingPages   Json?        @map("landing_pages")
  creatives      Json?        @map("creatives")
  conversionType String       @map("conversion_type")
  cookieLife     Int          @default(30) @map("cookie_life")
  postbackUrl    String?      @map("postback_url")
  status         OfferStatus @default(PENDING)
  createdAt      DateTime     @default(now()) @map("created_at")
  updatedAt      DateTime     @updatedAt @map("updated_at")
  network        Network      @relation(fields: [networkId], references: [id])
  campaigns      Campaign[]

  @@map("offers")
}

enum PayoutType {
  FIXED
  PERCENTAGE
  TIERED
}

enum OfferStatus {
  PENDING
  ACTIVE
  PAUSED
  EXPIRED
  REJECTED
}

model Campaign {
  id             String         @id @default(cuid())
  userId         String         @map("user_id")
  teamId         String?        @map("team_id")
  offerId       String         @map("offer_id")
  name           String
  slug           String         @unique
  trackingDomain String         @default("cpazen.com") @map("tracking_domain")
  customDomain   String?        @map("custom_domain")
  redirectMode   RedirectMode   @default(META_REFRESH) @map("redirect_mode")
  clickIdParam   String         @default("cid") @map("click_id_param")
  costModel      CostModel      @default(CPC) @map("cost_model")
  costValue      Decimal        @default(0) @db.Decimal(10, 4) @map("cost_value")
  dailyBudget    Decimal?       @db.Decimal(12, 2) @map("daily_budget")
  totalBudget    Decimal?       @db.Decimal(12, 2) @map("total_budget")
  geoRules       Json?          @map("geo_rules")
  deviceRules    Json?          @map("device_rules")
  timeRules      Json?          @map("time_rules")
  freqCap        Int?           @map("freq_cap")
  autoOptimize   Boolean        @default(false) @map("auto_optimize")
  optimizeRules  Json?          @map("optimize_rules")
  status         CampaignStatus @default(DRAFT)
  createdAt      DateTime       @default(now()) @map("created_at")
  updatedAt      DateTime       @updatedAt @map("updated_at")
  user           User           @relation(fields: [userId], references: [id])
  team           Team?          @relation(fields: [teamId], references: [id])
  offer          Offer          @relation(fields: [offerId], references: [id])
  clicks         Click[]
  conversions    Conversion[]
  rules          Rule[]
  reports        Report[]

  @@map("campaigns")
}

enum RedirectMode {
  HTTP_302
  META_REFRESH
  DOUBLE_META
  JS_REDIRECT
  IFRAME
}

enum CostModel {
  CPC
  CPM
  CPA
  REV_SHARE
}

enum CampaignStatus {
  DRAFT
  ACTIVE
  PAUSED
  STOPPED
  ARCHIVED
}

model Click {
  id             String    @id @default(cuid())
  campaignId     String    @map("campaign_id")
  clickId        String    @unique @map("click_id")
  ip             String    @db.Inet
  ipHash         String    @map("ip_hash")
  userAgent      String    @map("user_agent")
  uaHash         String    @map("ua_hash")
  country        String?   @db.Char(2)
  region         String?
  city           String?
  os             String?
  osVersion      String?   @map("os_version")
  browser        String?
  browserVersion String?   @map("browser_version")
  deviceType     String?   @map("device_type")
  deviceBrand    String?   @map("device_brand")
  deviceModel    String?   @map("device_model")
  carrier        String?
  referrer       String?
  source         String?
  medium         String?
  campaignName   String?   @map("campaign_name")
  content        String?
  term           String?
  subIds         Json?     @map("sub_ids")
  botScore       Int       @default(0) @map("bot_score")
  fraudFlags     String[]  @default([]) @map("fraud_flags")
  qualityScore   Int       @default(50) @map("quality_score")
  landingPageUrl String?   @map("landing_page_url")
  redirectUrl    String?   @map("redirect_url")
  redirectTimeMs Int?      @map("redirect_time_ms")
  clickedAt      DateTime  @default(now()) @map("clicked_at")
  redirectedAt   DateTime? @map("redirected_at")
  campaign       Campaign  @relation(fields: [campaignId], references: [id])
  conversion     Conversion?

  @@index([campaignId, clickedAt])
  @@index([clickId])
  @@index([ipHash, clickedAt])
  @@index([country, clickedAt])
  @@index([botScore, clickedAt])
  @@map("clicks")
}

model Conversion {
  id                String            @id @default(cuid())
  clickId           String            @unique @map("click_id")
  campaignId        String            @map("campaign_id")
  status            ConversionStatus  @default(PENDING)
  payout            Decimal           @db.Decimal(10, 4)
  currency          String            @default("USD")
  revenue           Decimal           @db.Decimal(10, 4)
  attributionType  AttributionType   @default(LAST_CLICK) @map("attribution_type")
  clickTimeMs       Int               @map("click_time_ms")
  postbackRaw       Json?             @map("postback_raw")
  postbackIp        String?           @map("postback_ip")
  postbackAt        DateTime?         @map("postback_at")
  validatedAt       DateTime?         @map("validated_at")
  validatedBy       String?           @map("validated_by")
  disputeReason     String?           @map("dispute_reason")
  payoutStatus      PayoutStatus      @default(PENDING) @map("payout_status")
  paidAt            DateTime?         @map("paid_at")
  createdAt         DateTime          @default(now()) @map("created_at")
  updatedAt         DateTime          @updatedAt @map("updated_at")
  click             Click             @relation(fields: [clickId], references: [clickId])
  campaign          Campaign          @relation(fields: [campaignId], references: [id])

  @@index([campaignId, createdAt])
  @@index([status, createdAt])
  @@map("conversions")
}

enum ConversionStatus {
  PENDING
  APPROVED
  REJECTED
  REVERSED
  FRAUD
}

enum AttributionType {
  FIRST_CLICK
  LAST_CLICK
  LINEAR
  TIME_DECAY
  POSITION_BASED
}

enum PayoutStatus {
  PENDING
  APPROVED
  PAID
  DISPUTED
}

model Rule {
  id              String    @id @default(cuid())
  campaignId      String    @map("campaign_id")
  userId          String    @map("user_id")
  name            String
  description     String?
  condition       Json
  action          Json
  aiGenerated     Boolean   @default(false) @map("ai_generated")
  aiConfidence    Decimal?  @db.Decimal(3, 2) @map("ai_confidence")
  lastTriggeredAt DateTime? @map("last_triggered_at")
  triggerCount    Int       @default(0) @map("trigger_count")
  status          RuleStatus @default(ACTIVE)
  createdAt       DateTime  @default(now()) @map("created_at")
  campaign        Campaign  @relation(fields: [campaignId], references: [id])

  @@map("rules")
}

enum RuleStatus {
  ACTIVE
  PAUSED
  ARCHIVED
}

model Report {
  id        String       @id @default(cuid())
  campaignId String?     @map("campaign_id")
  userId    String       @map("user_id")
  name      String
  type      ReportType
  config    Json
  status    ReportStatus @default(PENDING)
  fileUrl   String?      @map("file_url")
  fileSize  Int?         @map("file_size")
  rowCount  Int?         @map("row_count")
  schedule  Json?
  lastRunAt DateTime?    @map("last_run_at")
  nextRunAt DateTime?    @map("next_run_at")
  createdAt DateTime     @default(now()) @map("created_at")
  campaign  Campaign?    @relation(fields: [campaignId], references: [id])

  @@map("reports")
}

enum ReportType {
  PERFORMANCE
  CONVERSION
  GEO
  DEVICE
  FRAUD
  CUSTOM
}

enum ReportStatus {
  PENDING
  RUNNING
  COMPLETED
  FAILED
  SCHEDULED
}

model AiInsight {
  id             String         @id @default(cuid())
  userId         String         @map("user_id")
  campaignId     String?        @map("campaign_id")
  type           InsightType
  title          String
  description    String
  severity       InsightSeverity
  metrics        Json
  recommendation Json?
  userFeedback   String?        @map("user_feedback")
  applied        Boolean        @default(false)
  appliedAt      DateTime?      @map("applied_at")
  dismissed      Boolean        @default(false)
  confidence     Decimal        @db.Decimal(3, 2)
  createdAt      DateTime       @default(now()) @map("created_at")
  user           User           @relation(fields: [userId], references: [id])

  @@map("ai_insights")
}

enum InsightType {
  BOT_DETECTION
  OPTIMIZATION
  TREND_PREDICTION
  ANOMALY
  BUDGET_ALERT
  CAP_ALERT
}

enum InsightSeverity {
  INFO
  WARNING
  CRITICAL
  OPPORTUNITY
}

model Notification {
  id        String            @id @default(cuid())
  userId    String            @map("user_id")
  type      NotificationType
  title     String
  body      String
  data      Json?
  channels  String[]          @default(["in_app"]) 
  readAt    DateTime?         @map("read_at")
  clickedAt DateTime?         @map("clicked_at")
  createdAt DateTime          @default(now()) @map("created_at")
  user      User              @relation(fields: [userId], references: [id])

  @@index([userId, readAt])
  @@map("notifications")
}

enum NotificationType {
  CONVERSION
  CAMPAIGN_ALERT
  AI_INSIGHT
  BILLING
  SYSTEM
  TEAM
}

model Subscription {
  id                   String               @id @default(cuid())
  userId               String               @unique @map("user_id")
  plan                 PlanTier             @default(FREE)
  status               SubscriptionStatus   @default(ACTIVE)
  eventsUsed           Int                  @default(0) @map("events_used")
  eventsLimit          Int                  @default(50000) @map("events_limit")
  overageCount         Int                  @default(0) @map("overage_count")
  stripeCustomerId     String?              @map("stripe_customer_id")
  stripeSubscriptionId String?              @map("stripe_subscription_id")
  stripePriceId        String?              @map("stripe_price_id")
  currentPeriodStart   DateTime             @map("current_period_start")
  currentPeriodEnd     DateTime             @map("current_period_end")
  cancelAtPeriodEnd    Boolean              @default(false) @map("cancel_at_period_end")
  createdAt            DateTime             @default(now()) @map("created_at")
  updatedAt            DateTime             @updatedAt @map("updated_at")
  user                 User                 @relation(fields: [userId], references: [id])

  @@map("subscriptions")
}

enum PlanTier {
  FREE
  STARTER
  PRO
  ENTERPRISE
}

enum SubscriptionStatus {
  ACTIVE
  PAST_DUE
  CANCELED
  UNPAID
  TRIALING
}

model AuditLog {
  id        String    @id @default(cuid())
  userId    String?   @map("user_id")
  action    String
  entityType String   @map("entity_type")
  entityId  String    @map("entity_id")
  oldValue  Json?     @map("old_value")
  newValue  Json?     @map("new_value")
  ip        String?   @db.Inet
  userAgent String?   @map("user_agent")
  createdAt DateTime  @default(now()) @map("created_at")
  user      User?     @relation(fields: [userId], references: [id])

  @@index([userId, createdAt])
  @@index([entityType, entityId])
  @@map("audit_logs")
}

model DocArticle {
  id        String   @id @default(cuid())
  slug      String   @unique
  title     String
  content   String
  category  String
  tags      String[]
  order     Int      @default(0)
  published Boolean  @default(false)
  viewCount Int      @default(0) @map("view_count")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("doc_articles")
}

model FailedPostback {
  id        String   @id @default(cuid())
  clickId   String?  @map("click_id")
  rawData   Json?    @map("raw_data")
  error     String?
  sourceIp  String?  @map("source_ip") @db.Inet
  createdAt DateTime @default(now()) @map("created_at")

  @@index([createdAt])
  @@index([clickId])
  @@map("failed_postbacks")
}
