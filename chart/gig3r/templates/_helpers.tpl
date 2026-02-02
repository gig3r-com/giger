{{/*
Expand the name of the chart.
*/}}
{{- define "gig3r.host" -}}
{{ .Values.environment }}.{{ .Values.base_url }}
{{- end }}

{{- define "gig3r.frontend.app" -}}
gig3r-{{ default "app" .Values.environment }}-front
{{- end }}

{{- define "gig3r.backend.app" -}}
gig3r-{{ default "app" .Values.environment }}-api
{{- end }}

{{- define "gig3r.frontend.image" -}}
{{ .Values.frontend.image | default "ghcr.io/gig3r-com/gig3r-frontend" }}:{{ default "dev" .Values.frontend.tag }}
{{- end }}

{{- define "gig3r.backend.image" -}}
{{ .Values.backend.image | default "ghcr.io/gig3r-com/gig3r-backend" }}:{{ default "dev" .Values.backend.tag }}
{{- end }}

{{- define "gig3r.database.password" -}}
{{- $len := 24 | int -}}
{{- $obj := (lookup "v1" "Secret" .Namespace "gig3r-secret").data -}}
{{- if $obj }}
{{- index $obj "POSTGRES_PASSWORD" | b64dec -}}
{{- else -}}
{{- default "giger" .Values.database.password -}}
{{- end -}}
{{- end }}

{{- define "gig3r.backend.debug" -}}
{{- if eq "app" .Release.Namespace -}}
true
{{- else -}}
false
{{- end -}}
{{- end }}

#if .Values.environment != app then Development, else Production 
{{- define "gig3r.backend.environment" -}}
  {{- if eq "app" .Values.environment -}}
    "Production"
  {{- else -}}
    "Development"
  {{- end -}}
{{- end -}}

{{- define "gig3r.postgres.app" -}}
gig3r-{{ default "app" .Values.environment }}-postgres
{{- end }}

{{- define "gig3r.postgres.image" -}}
{{ .Values.database.image | default "ghcr.io/gig3r-com/gig3r-mongo" }}:{{ default "latest" .Values.database.tag }}
{{- end }}
