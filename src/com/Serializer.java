package com;

import org.nustaq.serialization.FSTObjectOutput;
import org.nustaq.serialization.FSTObjectInput;
import org.nustaq.serialization.FSTConfiguration;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.Serializable;

public class Serializer {
  FSTConfiguration conf;

  public Serializer() {
    this.conf = FSTConfiguration.createDefaultConfiguration();
  }

  public byte[] serialize(Object obj) {
    if (null == obj) {
      return new byte[0];
    } else if (!(obj instanceof Serializable)) {
      throw new IllegalArgumentException(
          "[" + obj.getClass().getName() + "] does not implement java.io.Serializable interface.");
    }

    byte[] result = conf.asByteArray(obj);
    return result;
  }

  public Object deserialize(byte[] bytes) {
    if (null == bytes || 0 == bytes.length) {
      return null;
    }

    return conf.asObject(bytes);
  }

}
