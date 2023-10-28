{{/*
Expand the name of the chart.
*/}}
{{- define "gig3r.host" -}}
"{{ .Values.environment }}.{{ .Values.base_url }}"
{{- end }}

{{- define "gig3r.frontend.app" -}}
"gig3r-front-{{ default "app" .Values.environment }}"
{{- end }}

{{- define "gig3r.backend.app" -}}
"gig3r-api-{{ default "app" .Values.environment }}"
{{- end }}

{{- define "gig3r.frontend.image" -}}
"{{ default "mivalsten/gig3r-frontend" .Values.frontend.image }}:{{ default "dev" .Values.frontend.tag }}"
{{- end }}

{{- define "gig3r.backend.image" -}}
"{{ default "mivalsten/gig3r-backend" .Values.backend.image }}:{{ default "dev" .Values.backend.tag }}"
{{- end }}

{{- define "gig3r.database.password" -}}
{{- $len := 24 | int -}}
{{- $obj := (lookup "v1" "Secret" .Namespace "gig3r-secret").data -}}
{{- if $obj }}
{{- index $obj "DB_PASSWORD" -}}
{{- else -}}
{{- randAlphaNum $len | b64enc -}}
{{- end -}}
{{- end }}

{{- define "gig3r.backend.debug" -}}
{{- if eq "app" .Release.Namespace -}}
true
{{- else -}}
false
{{- end -}}
{{- end }}

{{- define "gig3r.backend.config" -}}
"{
  \"postgres\": {
    \"username\": \"{{ .Values.database.user }}\",
    \"password\": \"{{- include "gig3r.database.password" (dict "Namespace" .Namespace ) -}}\",
    \"host\": \"postgres-postgresql.postgres.svc.cluster.local\",
    \"database\": \"{{ .Values.database.name }}\"
  },
  \"flask\": {
    \"host\": \"127.0.0.1\",
    \"port\": \"7312\",
    \"debug\": {{ include "gig3r.backend.debug" }}
  }
}"
{{- end }}