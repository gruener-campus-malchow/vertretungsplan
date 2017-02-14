# Mehrere Tage laden
Die API sollte die neuesten Pläne von jedem Tag zurückliefern (wenn denn schon einer online ist), damit man am Vortag schon sieht, was am nächsten Tag los ist.
Im Moment liefert sie anscheinend nur den Plan vom aktuellen Tag zurück, was nicht sehr praktisch ist.

Ein Tag eines Vertretungsplanes sieht so aus, wie in [api.md](api.md) beschrieben.
Wir können mehrere Tage in eine Liste packen:

```
[
  { <1 tag siehe api.md> }, 
  { < noch ein Tag siehe api.md > }, ...
]
```

Es können ein oder mehrere Tage vorhanden sein.
