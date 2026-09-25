"""Render public/cv/Yurii_Piontkovskyi_CV.pdf. One-off layout, Helvetica, A4."""

from reportlab.lib.colors import HexColor, white
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    FrameBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    HRFlowable,
)

OUT = "public/cv/Yurii_Piontkovskyi_CV.pdf"
INK = HexColor("#1a1a1a")
MUTED = HexColor("#444444")
RULE = HexColor("#1a1a1a")
PAGE_W, PAGE_H = A4
MARGIN = 12 * mm
GAP = 6 * mm
LEFT_W = 68 * mm
RIGHT_W = PAGE_W - (2 * MARGIN) - GAP - LEFT_W
TOP = PAGE_H - 14 * mm
BOTTOM = 12 * mm
FRAME_H = TOP - BOTTOM


def styles():
    return {
        "name": ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=16, leading=18, textColor=INK),
        "title": ParagraphStyle("title", fontName="Helvetica", fontSize=8, leading=10.5, textColor=INK),
        "h": ParagraphStyle("h", fontName="Helvetica-Bold", fontSize=8, leading=10, textColor=INK, spaceBefore=7, spaceAfter=2),
        "body": ParagraphStyle("body", fontName="Helvetica", fontSize=7.6, leading=10.2, textColor=MUTED, alignment=TA_LEFT),
        "job": ParagraphStyle("job", fontName="Helvetica-Bold", fontSize=8, leading=10.4, textColor=INK, spaceBefore=6),
        "meta": ParagraphStyle("meta", fontName="Helvetica-Oblique", fontSize=7.4, leading=9.4, textColor=MUTED),
        "bullet": ParagraphStyle("bullet", fontName="Helvetica", fontSize=7.5, leading=9.5, textColor=INK, leftIndent=8, bulletIndent=0, spaceBefore=1),
        "small": ParagraphStyle("small", fontName="Helvetica", fontSize=7.4, leading=9.3, textColor=INK),
        "label": ParagraphStyle("label", fontName="Helvetica-Bold", fontSize=7.4, leading=9.2, textColor=INK, spaceBefore=6, spaceAfter=1),
    }


S = styles()


def P(text, style="body"):
    return Paragraph(text, S[style])


def bullets(items):
    out = []
    for item in items:
        out.append(Paragraph("• " + item, S["bullet"]))
    return out


def section(title):
    return [
        Paragraph(title.upper(), S["h"]),
        HRFlowable(width="100%", thickness=0.4, color=RULE, spaceAfter=3),
    ]


def left():
    story = []
    story += section("Contact")
    story.append(P("yurapion@gmail.com", "small"))
    story.append(P("Remote | Open to UK / EU / Global", "small"))
    story.append(P("Portfolio — yurapion.github.io", "small"))
    story.append(P("GitHub — yurapion", "small"))
    story.append(P("LinkedIn — yuryi-piontkovskyi", "small"))

    story += section("Languages")
    story.append(P("English — Professional working", "small"))
    story.append(P("Ukrainian — Native", "small"))
    story.append(P("Russian — Fluent", "small"))

    story += section("Core skills")
    story += bullets(
        [
            "Multi-tenant architecture and schema design",
            "Authentication and authorization",
            "Microservices and distributed systems",
            "Event-driven / async architecture",
            "Cloud-native (AWS, Azure, ECS)",
            "Agentic workflows in production",
            "Data compliance and security",
            "Realtime UX (SignalR, WebSockets)",
            "CI/CD and infrastructure as code",
            "Directing engineers and client delivery",
        ]
    )

    story += section("Tech stack")
    story.append(Paragraph("<b>Languages</b>", S["label"]))
    story.append(P("TypeScript, JavaScript, Go, C# (.NET), Dart, SQL", "small"))
    story.append(Paragraph("<b>Frontend</b>", S["label"]))
    story.append(P("React 17–18, Vite, Redux Toolkit, React Query, Apollo, MUI, Flutter, Riverpod", "small"))
    story.append(Paragraph("<b>Backend</b>", S["label"]))
    story.append(P("NestJS, Node.js, Fastify, ASP.NET Core, MediatR, GraphQL (Hasura, Apollo, gqlgen), REST", "small"))
    story.append(Paragraph("<b>Data</b>", S["label"]))
    story.append(P("PostgreSQL, TypeORM, InfluxDB, DynamoDB, Dgraph, Kafka, EF Core, Hasura", "small"))
    story.append(Paragraph("<b>Cloud / Infra</b>", S["label"]))
    story.append(P("AWS (Cognito, ECS, Lambda, SQS, S3, SageMaker), Azure (App Service, AD B2C, Blob), Docker, Kubernetes, Terraform", "small"))
    story.append(Paragraph("<b>DevOps</b>", S["label"]))
    story.append(P("GitHub Actions, Bitbucket Pipelines, Drone, Flux/ArgoCD, Helm, SonarQube, Testcontainers, Sentry", "small"))

    story += section("Industries")
    story += bullets(
        [
            "Clinical VR / biosensing",
            "Healthcare and NHS",
            "Medical imaging and AI/ML",
            "Consumer media and insights",
            "Hospitality / restaurant SaaS",
        ]
    )
    return story


def right():
    story = []
    story += section("Professional summary")
    story.append(
        P(
            "Staff engineer with 8+ years building production platforms in healthcare, clinical VR, AI-assisted imaging, consumer media, and SaaS. At Evolve I own the cloud architecture for a clinical headset platform: identity, the application database, and the operator product. I direct another engineer on that platform.",
            "body",
        )
    )
    story.append(Spacer(1, 4))
    story.append(
        P(
            "Before that, end-to-end ownership of Node.js/TypeScript, Go, .NET, React, and Flutter systems, including infrastructure as code, NHS-grade data compliance, and CI/CD. I also run AI agents as a verified engineering multiplier against live production systems. Case studies: yurapion.github.io.",
            "body",
        )
    )

    story += section("Experience")
    story.append(P("Evolve", "job"))
    story.append(P("Staff Engineer | Sep 2026 – Present | Remote", "meta"))
    story.append(
        P(
            "Staff engineer on the cloud platform for a clinical VR headset. I own architecture across identity, the application database, and the operator product, and I direct another engineer on that platform.",
            "body",
        )
    )
    story += bullets(
        [
            "PostgreSQL holds application data: 19 tables and 33 TypeORM migrations. A session cannot point at a participant or device from another organization. Row-level security still applies when a query forgets its filter. The service connects as a role that does not own the tables, because a table owner bypasses those policies without an error.",
            "Operator and device identity are in Cognito. The token decides the organization. A device credential resolves to the organization that owns the headset.",
            "I ship the operator application for a live headset session: create and start a run, signal quality, live sensor traces, and a CSV export that returns an error when it fails.",
            "Export jobs travel on the Kafka cluster already running in every environment. The data_exports row is the source of truth for status. I own that decision.",
        ]
    )

    story.append(P("Blum Health (via Honeycomb Software)", "job"))
    story.append(P("Senior Full-Stack Engineer | Jul 2023 – Present | Remote", "meta"))
    story.append(
        P(
            "Lead engineer across three concurrent client products spanning healthcare, medical imaging AI, and restaurant SaaS — owning architecture, delivery, and client communication on each.",
            "body",
        )
    )
    story.append(P("CardMedic — Healthcare communications", "job"))
    story += bullets(
        [
            "Architected 9 Node.js/TypeScript microservices on AWS (Lambda, API Gateway, DynamoDB, SQS/SNS, S3, Cognito), deployed across 20+ NHS trusts.",
            "Scaled translation throughput with sharded SQS queues, batching, DLQ monitoring, and CloudWatch to Slack alerting: 100k+ translation jobs/month without API throttling.",
            "NHS data compliance: AES encryption at rest for transcripts, multi-year retention, HMAC webhook verification, and a feature-flagged path to swap translation providers without forking the codebase.",
            "React admin platform and a Flutter app with 55 locales, delivered via GitHub Actions.",
        ]
    )
    story.append(P("AI Sight Suite — Clinical imaging and AI screening", "job"))
    story += bullets(
        [
            "Built a .NET 10 Clean Architecture backend, PostgreSQL via EF Core, with LanguageExt Either/Option for explicit error handling.",
            "Cross-cloud: Azure for hosting, AD B2C, and blob storage; AWS SageMaker for dual-model inference. 5,000+ retinal screenings across pilot clinics (delivery record).",
            "Tiered clinical audit, DICOM pipelines, and a React 18 + Vite SPA with SignalR grading updates. Testcontainers, SonarQube, and Terraform-managed Azure infrastructure.",
        ]
    )
    story.append(P("AccentPOS — Restaurant and venue SaaS", "job"))
    story += bullets(
        [
            "Hasura + Fastify, PostgreSQL with 326 SQL migrations as the schema backbone, live across 30+ venues (delivery record).",
            "Payments, QR payment links, and Cognito JWT bridged into Hasura session variables for tenant-scoped access.",
            "PayPal, Dojo, Deliverect, and Xero behind one integration path. React operations platform with live order subscriptions.",
        ]
    )

    story.append(P("Wunder AI", "job"))
    story.append(P("Senior Full-Stack Engineer | Mar 2020 – Sep 2023 | Remote", "meta"))
    story += bullets(
        [
            "React frontends on a shared Apollo GraphQL + WebSocket layer: Playtime (branded festival SPA, 100k+ attendees in the delivery record) and Target Group (Cytoscape/D3).",
            "LiveMind realtime session mirroring: the B2B app embeds the consumer SPA and mirrors participant activity through shared GraphQL subscriptions.",
            "Contributed to a Go + gqlgen monorepo (49 command binaries) with Dgraph, PostgreSQL, and Kafka, and a rule-book-to-Go generator for consumer profiling.",
            "Drone, Kaniko, Kubernetes, Flux/ArgoCD, and Prometheus/Grafana.",
        ]
    )

    story.append(P("Freelance / Contract", "job"))
    story.append(P("Full-Stack Engineer | Mar 2017 – Mar 2020 | Remote", "meta"))
    story += bullets(
        [
            "Multi-tenant React dashboards and Node.js/Express APIs on PostgreSQL and MongoDB, with JWT auth, role-based access, and Stripe.",
            "Docker, GitHub Actions / GitLab CI, and direct work with founders on scoping and delivery.",
        ]
    )
    return story


def footer_left():
    story = []
    story += section("Security and compliance")
    story += bullets(
        [
            "PostgreSQL row-level security keyed on the organization",
            "AES encryption, S3 SSE, HMAC verification",
            "NHS / clinical multi-year retention",
            "OAuth2, Cognito, Azure AD B2C, JWT",
            "Tenant and role-scoped access (Hasura, claims)",
        ]
    )
    story += section("Leadership")
    story += bullets(
        [
            "Direct an engineer on the Evolve platform: schema, authentication, and tenancy rules.",
            "Mentored interns and juniors through code-level guidance and PR reviews.",
            "Direct client communication on priorities, trade-offs, and delivery timelines.",
        ]
    )
    story += section("Education")
    story.append(P("Bachelor, Computer Engineering", "small"))
    story.append(P("Taras Shevchenko National University of Kyiv", "small"))
    story.append(P("2013–2017", "small"))
    return story


def footer_right():
    story = []
    story += section("AI-assisted engineering")
    story += bullets(
        [
            "Run AI agents against live production systems from written runbooks: dry-run, small live test, then rollout, with DLQ alarms as the safety net.",
            "A frontier model plans and reviews, cheaper agents do read-heavy work, and an independent agent verifies changes before they ship.",
            "Built graphify (codebase to a queryable knowledge graph, used across three client repos) and DevPrep, an interview-preparation product on the Claude API.",
        ]
    )
    story += section("Methods")
    story += bullets(
        [
            "Schema as code: TypeORM and SQL migrations",
            "Row-level security and foreign keys that include the tenant",
            "Feature flags for safe rollout",
            "Clean Architecture and CQRS where the domain needs them",
        ]
    )
    return story


def draw_header(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(INK)
    canvas.rect(0, PAGE_H - 11 * mm, PAGE_W, 11 * mm, fill=1, stroke=0)
    canvas.setFillColor(white)
    canvas.setFont("Helvetica-Bold", 11)
    canvas.drawString(MARGIN, PAGE_H - 7.2 * mm, "YURII PIONTKOVSKYI")
    canvas.setFont("Helvetica", 7.5)
    canvas.drawRightString(PAGE_W - MARGIN, PAGE_H - 7.2 * mm, "Staff Engineer")
    canvas.restoreState()


def main():
    doc = BaseDocTemplate(
        OUT,
        pagesize=A4,
        title="Yurii Piontkovskyi — CV",
        author="Yurii Piontkovskyi",
    )
    left_frame = Frame(MARGIN, BOTTOM, LEFT_W, FRAME_H, id="left", showBoundary=0)
    right_frame = Frame(MARGIN + LEFT_W + GAP, BOTTOM, RIGHT_W, FRAME_H, id="right", showBoundary=0)
    doc.addPageTemplates([PageTemplate(id="cv", frames=[left_frame, right_frame], onPage=draw_header)])

    # Left column is one frame tall per page. Put the stable left rail on page 1,
    # and the shorter left sections after a frame break so they land under it
    # only if the right column has already moved on. Flow is left, then right,
    # then the next page's left. So: page-1 left, page-1 right (must fit), then
    # leftover left sections would steal page-2 left before leftover experience.
    # Keep the left rail to a single frame and put security/leadership/education
    # at the end of the right column instead.
    story = left()
    story.append(FrameBreak())
    story.extend(right())
    story.append(FrameBreak())
    story.extend(footer_left())
    story.append(FrameBreak())
    story.extend(footer_right())
    doc.build(story)


if __name__ == "__main__":
    main()
