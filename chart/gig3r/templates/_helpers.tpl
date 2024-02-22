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
{{ default "mivalsten/gig3r-frontend" .Values.frontend.image }}:{{ default "dev" .Values.frontend.tag }}
{{- end }}

{{- define "gig3r.backend.image" -}}
{{ default "mivalsten/gig3r-backend" .Values.backend.image }}:{{ default "dev" .Values.backend.tag }}
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
{
  "postgres": {
    "username": "{{ .Values.database.user }}",
    "password": "{{ .Values.database.password }}",
    "host": "postgres-postgresql.postgres.svc.cluster.local",
    "database": "{{ .Values.database.name }}",
    "db_init": false
  },
  "flask": {
    "host": "{{ include "gig3r.host" . }}",
    "port": "80",
    "debug": {{ include "gig3r.backend.debug" . }}
  }
}
{{- end }}

{{- define "gig3r.swagger.app" -}}
gig3r-{{ default "app" .Values.environment }}-swagger
{{- end }}

{{- define "gig3r.swagger.url" -}}
{{- cat "swagger." (include "gig3r.host" .) | nospace -}}
{{- end }}